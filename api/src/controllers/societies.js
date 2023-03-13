// SOCIETY CONTROLLER
const { user, societyLinks } = require("../../prisma/prisma.js");
const prisma = require("../../prisma/prisma.js");
const auth = require("../utils/jwt_auth.js");

// This function is used to create a new society
async function signup(req, res) {
  try{
    const decoded = await auth.authenticate(req);

    // Check that the request body is not empty and contains the correct properties
    if (
      !req.body.societyName ||
      !req.body.description ||
      !req.body.email
    ) {
      res.status(400).send({ error: "Missing Society Details" });
      return;
    }
    console.log("Check 1")
     // Check if the user exists
    let user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });
    console.log("Check 2")

    if (!user) {
      return res.status(409).send({ token: null, message: "User Not Found" });
    }
    console.log("Check 3")

    // Check if the society already exists
    let society = await prisma.society.findUnique({
      where: {
        name: req.body.societyName,
      },
    });
    console.log("Check 4")

    if (society) {
      return res
        .status(409)
        .send({ token: null, message: "Society already exists" });
    }
    console.log("Check 5")

    society = await prisma.society.create({
      data: {
        name: req.body.societyName,
        description: req.body.description,
        email : req.body.email,
        category: req.body.category ? req.body.category : "Other",
      },
    });
    console.log("Check 6")

    society_links = await prisma.societyLinks.create({
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
    console.log("Check 7")

    committee = await prisma.committee.create({
      data: {
        userId: user.id,
        societyId: society.id,
        role : "President",
        isPresident : true,
      },
    });
    console.log("Check 8")

    res.status(200).send({ society , committee , society_links });
  }
  catch (err) {
    console.log(err);
    res.status(401).send({ token: null, error: "Unauthorized" });
  }
}

// async function signup(req, res) {
  // Check that the request body is not empty and contains the correct properties
  // if (
  //   req.body === undefined ||
  //   req.body.name === undefined ||
  //   req.body.userId === undefined
  // ) {
  //   return res
  //     .status(409)
  //     .send({ token: null, message: "Request body cannot be empty" });
  // }

  // // Check if the user exists
  // let user = await prisma.user.findUnique({
  //   where: {
  //     userId: req.body.userId,
  //   },
  // });

  // if (!user) {
  //   return res.status(409).send({ token: null, message: "User Not Found" });
  // }
  // // Check if the society already exists
  // let society = await prisma.society.findUnique({
  //   where: {
  //     name: req.body.name,
  //   },
  // });

  // if (society) {
  //   return res
  //     .status(409)
  //     .send({ token: null, message: "Society already exists" });
  // }

  // // Check that name, email and password are not empty
  // if (req.body.name === "") {
  //   return res
  //     .status(409)
  //     .send({ token: null, message: "Name cannot be empty" });
  // }

  // // Create a new user
  // society = await prisma.society.create({
  //   data: {
  //     name: req.body.name,
  //   },
  // });
  // committee = await prisma.committee.create({
  //   data: {
  //     userId: user.id,
  //     user: user,
  //     society: society,
  //     societyId: society.id,
  //   },
  // });

  // // Mail the organisation success

  // // Send the JWT token in the response
  // res.status(200).send();
// }

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
        id: parseInt(req.body.societyId),
      },
      include: {
        members: true,
        links: true,
        events: true,
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
    console.log(committee);

    if (committee.length === 0) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });

    if (society.length === 0) {
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

    // res.status(200).send({ message: "Society Updated" /*, society: updateSociety, links: updateSocietyLinks*/ });
    // res.status(200).send({ message: "Society Updated", society: updateSociety/*, links: updateSocietyLinks*/ });
    res.status(200).send({ message: "Society Updated"});
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// Controller function to add a user to the committee of a society
async function addCommitteeMember(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    // Check if user is a committee member of the society
    const committee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
      select: {
        isPresident: true,
      },
    });

    if (committee.length === 0) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    // Get the user from the email
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(404).send({ message: "User Not Found" });
      return;
    }

    // Check if the user is already a committee member
    const isCommitteeMember = await prisma.committee.findMany({
      where: {
        userId: user.id,
        societyId: req.body.societyId,
      },
    });

    if (isCommitteeMember.length > 0) {
      res.status(400).send({ message: "User is already a committee member" });
      return;
    }

    // Add the user to the committee
    const addCommitteeMember = await prisma.committee.create({
      data: {
        userId: user.id,
        societyId: req.body.societyId,
        isPresident: false,
        role: req.body.role,
      },
    });

    res.status(200).send({ message: "User added to committee" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// Controller function to remove a user from the committee of a society
async function removeCommitteeMember(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    // Check if user is a committee member of the society
    const committee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
      select: {
        isPresident: true,
      },
    });

    if (committee.length === 0) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    // Check if the user is a committee member
    const isCommitteeMember = await prisma.committee.findMany({
      where: {
        userId: req.body.userId,
        societyId: req.body.societyId,
      },
    });

    if (isCommitteeMember == 0) {
      res.status(400).send({ message: "User is not a committee member" });
      return;
    }

    // Remove the user from the committee
    const removeCommitteeMember = await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: req.body.userId,
          societyId: req.body.societyId,
        }
      },
    });

    res.status(200).send({ message: "User removed from committee" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Internal Server Error" });
  }
}

// Controller function to update a user's role in the committee of a society
async function updateCommitteeMember(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    // Check if user is a committee member of the society
    const committee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
      select: {
        isPresident: true,
      },
    });

    if (committee.length === 0) {
      res.status(401).send({ message: "Unauthorized" });
      return;
    }

    // Check if the user is a committee member
    const isCommitteeMember = await prisma.committee.findMany({
      where: {
        userId: req.body.userId,
        societyId: req.body.societyId,
      },
    });
    console.log(isCommitteeMember);

    if (isCommitteeMember.length == 0) {
      res.status(400).send({ message: "User is not a committee member" });
      return;
    }

    // Update the user's role in the committee
    const updateCommitteeMember = await prisma.committee.update({
      where: {
        userId_societyId: {
          userId: req.body.userId,
          societyId: req.body.societyId,
        }
      },
      data: {
        role: req.body.role,
        isPresident: req.body.isPresident,
      },
    });

    // Check that there aren't multiple presidents
    const presidents = await prisma.committee.findMany({
      where: {
        societyId: req.body.societyId,
        isPresident: true,
      },
    });

    // If there are multiple presidents, set the first one to false
    if (presidents.length > 1) {
      const updatePresident = await prisma.committee.update({
        where: {
          userId: userId,
          societyId: req.body.societyId,
        },
        data: {
          isPresident: false,
        },
      });
    }

    res.status(200).send({ message: "User updated in committee" });
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
  addCommitteeMember,
  removeCommitteeMember,
  updateCommitteeMember,
};
