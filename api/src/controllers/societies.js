// SOCIETY CONTROLLER
const { user } = require("../../prisma/prisma.js");
const prisma = require("../../prisma/prisma.js");
const auth = require("../utils/jwt_auth.js");

// This function is used to create a new society
async function signup(req, res) {
  // Check that the request body is not empty and contains the correct properties
  if (
    req.body === undefined ||
    req.body.name === undefined ||
    req.body.userId === undefined
  ) {
    return res
      .status(409)
      .send({ token: null, message: "Request body cannot be empty" });
  }

  // Check if the user exists
  let user = await prisma.user.findUnique({
    where: {
      userId: req.body.userId,
    },
  });

  if (!user) {
    return res.status(409).send({ token: null, message: "User Not Found" });
  }
  // Check if the society already exists
  let society = await prisma.society.findUnique({
    where: {
      name: req.body.name,
    },
  });

  if (society) {
    return res
      .status(409)
      .send({ token: null, message: "Society already exists" });
  }

  // Check that name, email and password are not empty
  if (req.body.name === "") {
    return res
      .status(409)
      .send({ token: null, message: "Name cannot be empty" });
  }

  // Create a new user
  society = await prisma.society.create({
    data: {
      name: req.body.name,
    },
  });
  committee = await prisma.committee.create({
    data: {
      userId: user.id,
      user: user,
      society: society,
      societyId: society.id,
    },
  });

  // Mail the organisation success

  // Send the JWT token in the response
  res.status(200).send();
}

async function getSocieties(req, res) {
  // Return a list of all societies, their names, number of members and an abbreviated description
  const societies = await prisma.society.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      category: true,
      // Calculate the number of members in the society
      members: {
        select: {
          userId: true,
        },
      },
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

async function getSocietyById(req, res) {
  // we should check if the user that made the request is a committee member of the society
  try {
    let committee = null;

    console.log(req.headers.authorization);

    // If the request header authorization is not empty, the user is logged in
    if (req.headers.authorization) {
      // Get the decoded token
      const userId = (await auth.authenticate(req)).id;

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
    }

    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        members: {
          select: {
            userId: true,
          },
        },
        links: {
          select: {
            instagram: true,
            facebook: true,
            twitter: true,
            website: true,
            logo: true,
            banner: true,
          },
        },
      },
    });

    // Only send the number of members
    society.members = society.members.length;

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
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

async function deleteSociety(req, res) {
  try {
    const decoded = await auth.authenticate(req);

    const userId = decoded.id;
    const isAdmin = decoded.admin;
    const commitee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });
    console.log(decoded);
    if (!commitee.isPresident && !isAdmin) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }
    const archiveSociety = await prisma.society.update({
      where: { id: req.body.societyId },
      data: { isArchived: true },
    });
    res.status(200).send({ message: "Society Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

async function updateSociety(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    // Check if user is a committee member of the society
    const committee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    if (!committee) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });

    if (!society) {
      res.status(404).send({ message: "Society Not Found" });
      return;
    }

    // Update the society
    // Only update the fields that are not empty in the request body
    const updateSociety = await prisma.society.update({
      where: {
        id: req.body.societyId,
      },
      data: {
        name: req.body.name ? req.body.name : society.name,
        category: req.body.category ? req.body.category : society.category,
        email: req.body.email ? req.body.email : society.email,
        description: req.body.description
          ? req.body.description
          : society.description,
      },
    });

    // get the society links
    const societyLinks = await prisma.societyLinks.findUnique({
      where: {
        societyId: req.body.societyId,
      },
    });

    // Update the society links if they exist in the request body
    console.log(req.body.links);
    if (req.body.links) {
      console.log("here");
      const updateSocietyLinks = await prisma.societyLinks.update({
        where: {
          societyId: req.body.societyId,
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
      console.log(updateSocietyLinks);
    }

    res.status(200).send({ message: "Society Updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

module.exports = {
  signup,
  getSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
};
