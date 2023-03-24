// SOCIETY CONTROLLER
const prisma = require("../../prisma/prisma.js");
const auth = require("../utils/jwt_auth.js");

/**
 *  This function is called when a user wants to create a new society.
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function signup(req, res) {
  try {
    const decoded = await auth.authenticate(req);

    // Check that the request body is not empty and contains the correct
    // properties
    if (!req.body.name || !req.body.description || !req.body.email) {
      res.status(400).send({ error: "Missing Society Details" });
      return;
    }
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res.status(409).send({ token: null, message: "User Not Found" });
    }

    // Check if the society name already exists
    const societyName = await prisma.society.findUnique({
      where: {
        name: req.body.name,
      },
    });
    // Check if the society email already exists
    const societyEmail = await prisma.society.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (societyName) {
      return res.status(409).send({
        token: null,
        message: "Society already exists with that name",
      });
    }
    if (societyEmail) {
      return res.status(409).send({
        token: null,
        message: "Society already exists with that email",
      });
    }
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // Check that the email has a valid regex
    if (!req.body.email.match(validRegex)) {
      return res.status(409).send({
        token: null,
        message: "Email inputed doesnt have a valid regex",
      });
    }
    society = await prisma.society.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        category: req.body.category ? req.body.category : "Other",
      },
    });
    listSocietyLinks = await prisma.societyLinks.create({
      data: {
        societyId: society.id,
        banner: req.body.banner ? req.body.banner : null,
        logo: req.body.logo ? req.body.logo : null,
        website: req.body.website ? req.body.website : null,
        facebook: req.body.facebook ? req.body.facebook : null,
        instagram: req.body.instagram ? req.body.instagram : null,
        twitter: req.body.twitter ? req.body.twitter : null,
      },
    });

    committee = await prisma.committee.create({
      data: {
        userId: user.id,
        societyId: society.id,
        role: "President",
        isPresident: true,
      },
    });

    res.status(200).send({ society, committee, listSocietyLinks });
  } catch (err) {
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}

/**
 * This function is to get a list of all societies. 
 * @param {Request} req The request object
 * @param {Response} res The response object

 */
async function getSocieties(req, res) {
  // Return a list of all societies, their names, number of members and an
  // abbreviated description
  const societies = await prisma.society.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      // Calculate the number of members in the society
      members: {
        select: {
          isArchived: true,
          userId: true,
        },
        where: { isArchived: false },
      },
      links: true,
    },
    where: {
      isArchived: false,
    },
  });

  // Only send the number of members
  societies.forEach((society) => {
    society.members = society.members.length;
    if (society.description.length > 50) {
      society.description = society.description.substring(0, 50) + "...";
    }
  });

  res.status(200).send(societies);
}

/**
 * This function is to get a society by id.
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function getSocietyById(req, res) {
  // we should check if the user that made the request is a committee member of
  // the society
  try {
    let committee = null;
    let isCommitteePresident = false;

    // If the request header authorization is not empty, the user is logged in
    if (req.headers.authorization) {
      // Get the decoded token
      try {
        decoded = await auth.authenticate(req);
      } catch (err) {
        res.status(401).send({ token: null, error: "Unauthorized" });
        return;
      }
      const userId = decoded.id;
      // Check if user is a committee member of the society
      committee = await prisma.committee.findMany({
        where: {
          userId: userId,
          societyId: req.body.societyId,
        },
        select: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      });

      // Check if the user is the president of the society
      checkMember = await prisma.committee.findMany({
        where: {
          userId: userId,
          societyId: req.body.societyId,
          isPresident: true,
        },
      });

      if (checkMember.length > 0) {
        isCommitteePresident = true;
      }
    }
    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: parseInt(req.body.societyId),
      },
      include: {
        members: true,
        links: true,
        events: {
          include: {
            society: true,
          },
        },
      },
    });

    // Only send the number of members
    const members = await prisma.members.findMany({
      where: { societyId: society.id, isArchived: false },
    });

    society.members = members.length;

    society.isCommitteePresident = isCommitteePresident;

    if (!committee) {
      res.status(200).send({
        society: society,
      });
      return;
    }
    // Add the committee members to the society object
    const committeeMembers = await prisma.committee.findMany({
      where: {
        societyId: req.body.societyId,
      },
      select: {
        userId: true,
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    // Add the committee members to the society object
    society.committee = committeeMembers;

    res.status(200).send({
      society: society,
    });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * This function is to delete a society.
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function deleteSociety(req, res) {
  try {
    let decoded = null;
    try {
      decoded = await auth.authenticate(req);
    } catch (err) {
      res.status(401).send({ token: null, error: "Unauthorized" });
      return;
    }
    const userId = decoded.id;
    const isAdmin = decoded.admin;
    const commitee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });
    // if it's not part of committee
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });
    if (!society) {
      res.status(400).send({ error: "Invalid id of society" });
      return;
    }
    if (!commitee.isPresident && !isAdmin) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    await prisma.society.update({
      where: { id: req.body.societyId },
      data: { isArchived: true },
    });
    res.status(200).send({ message: "Society Updated" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * This function is to update a society.
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function updateSociety(req, res) {
  let decoded = null;
  try {
    decoded = await auth.authenticate(req);
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Check that the request body has a societyId
  if (!req.body.societyId) {
    res.status(400).send({ message: "Missing societyId" });
    return;
  }

  // Check that the society id is of type number and is > 0
  if (typeof req.body.societyId !== "number" || req.body.societyId <= 0) {
    res.status(400).send({ message: "Invalid societyId" });
    return;
  }

  // Check that the society exists
  const society = await prisma.society.findUnique({
    where: {
      id: req.body.societyId,
    },
  });
  if (!society) {
    res.status(400).send({ message: "Society does not exist" });
    return;
  }

  // Check that the user is a committee member of the society
  const committee = await prisma.committee.findMany({
    where: {
      userId: decoded.id,
      societyId: society.id,
    },
  });

  // If the user is not a committee member of the society, return an error
  if (committee.length === 0) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  if (req.body.email) {
    // Check that email is not already in use
    const emailInUse = await prisma.society.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (emailInUse) {
      res.status(400).send({ message: "Email already in use" });
      return;
    }
  }

  // Update the society with the data if the data is provided
  await prisma.society.update({
    where: {
      id: society.id,
    },
    data: {
      name: req.body.name || society.name,
      description: req.body.description || society.description,
      email: req.body.email || society.email,
      category: req.body.category || society.category,
    },
  });

  const societyLinks = await prisma.societyLinks.findUnique({
    where: {
      societyId: society.id,
    },
  });

  // If society links are included in the request body, update the links
  if (req.body.links) {
    // Update the links
    await prisma.societyLinks.update({
      where: {
        societyId: society.id,
      },
      data: {
        website: req.body.links.website
          ? req.body.links.website
          : societyLinks.website,
        instagram: req.body.links.instagram
          ? req.body.links.instagram
          : societyLinks.instagram,
        twitter: req.body.links.twitter
          ? req.body.links.twitter
          : societyLinks.twitter,
        facebook: req.body.links.facebook
          ? req.body.links.facebook
          : societyLinks.facebook,
        logo: req.body.links.logo ? req.body.links.logo : societyLinks.logo,
        banner: req.body.links.banner
          ? req.body.links.banner
          : societyLinks.banner,
      },
    });
  }

  res.status(200).send({ message: "Society Updated" });
}

module.exports = {
  signup,
  getSocieties,
  getSocietyById,
  deleteSociety,
  updateSociety,
};
