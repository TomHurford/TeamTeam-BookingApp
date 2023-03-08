// SOCIETY CONTROLLER
const prisma = require('../../prisma/prisma.js');
const auth = require('../utils/jwt_auth.js');
const {mail} = require('../utils/emails.js');

/**
 * Get all societies
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {societies} The societies
 */
async function signup(req, res) {
  // Check that the request body is not empty and contains the correct
  // properties

  if (req.body.userId === undefined) {
    return res
        .status(409)
        .send({token: null, message: 'Request body requires userId'});
  }

  // Check if the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.userId,
    },
  });


  if (!user) {
    return res.status(409).send({token: null, message: 'User Not Found'});
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
        .send({token: null, message: 'Society already exists'});
  }

  // Check that name, email, description, category and links are not empty
  if (req.body.name === null ||
    req.body.email === null ||
    req.body.description === null ||
    req.body.category === null ||
    req.body.links === null) {
    return res
        .status(409)
        .send({token: null, message: 'Missing Fields'});
  }

  // Create a new society
  society = await prisma.society.create({
    data: {
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      category: req.body.category,
      links: {
        create: {
          instagram: req.body.links.instagram ? req.body.links.instagram : null,
          facebook: req.body.links.facebook ? req.body.links.facebook : null,
          twitter: req.body.links.twitte ? req.body.links.twitter : null,
          website: req.body.links.website? req.body.links.website : null,
          banner: req.body.links.banner ? req.body.links.banner : null,
          logo: req.body.links.logo? req.body.links.logo : null,
        },
      },
    },
  });

  /**
   * Example of JSON for signup
   * {
   * "userId": "1",
   * "name": "Society Name",
   * "email": "test@test.com",
   * "description": "Society Description",
   * "category": "Society Category",
   * "links": {
   * "instagram": "https://www.instagram.com/",
   * "facebook": "https://www.facebook.com/",
   * "twitter": "https://twitter.com/",
   * "website": "https://www.google.com/",
   * "banner": "https://www.google.com/",
   * "logo": "https://www.google.com/"
   * }
   * }
   *
   *  */
  // Create the committee for that society
  committee = await prisma.committee.create({
    data: {
      userId: user.id,
      role: 'President',
      isPresident: true,
      societyId: society.id,
    },
  });

  // Mail the organisation success
  // TODO: Uncomment when @Abdulrahman can check the mail function
  mail(
      to = req.body.email,
      subject = 'Society Created',
      body = 'Your society has been created successfully',
  );

  res.status(200).send({society: society});
}

/**
 * Get all societies
 * @param {req} req The request object
 * @param {res} res The response object
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
      society.description = society.description.substring(0, 50) + '...';
    }
  });

  res.status(200).send(societies);
}

/**
 * Get society by id
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {society} The society
 */
async function getSocietyById(req, res) {
  // we should check if the user that made the request is a committee member of
  // the society
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
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Archive society
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {res} Cpnfirmation message
 */
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
      res.status(401).send({message: 'Unauthorized'});
      return;
    }
    await prisma.society.update({
      where: {id: req.body.societyId},
      data: {isArchived: true},
    });
    res.status(200).send({message: 'Society Updated'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Update society
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {society} The updated society
 */
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
      res.status(401).send({message: 'Unauthorized'});
      return;
    }

    // Get the society
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });

    if (!society) {
      res.status(404).send({message: 'Society Not Found'});
      return;
    }

    // Update the society
    // Only update the fields that are not empty in the request body
    await prisma.society.update({
      where: {
        id: req.body.societyId,
      },
      data: {
        name: req.body.name ? req.body.name : society.name,
        category: req.body.category ? req.body.category : society.category,
        email: req.body.email ? req.body.email : society.email,
        description: req.body.description ?
          req.body.description :
          society.description,
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
      console.log('here');
      const updateSocietyLinks = await prisma.societyLinks.update({
        where: {
          societyId: req.body.societyId,
        },
        data: {
          website: req.body.links.website ?
            req.body.links.website :
            societyLinks.website,
          instagram: req.body.links.instagram ?
            req.body.links.instagram :
            societyLinks.instagram,
          twitter: req.body.links.twitter ?
            req.body.links.twitter :
            societyLinks.twitter,
          facebook: req.body.links.facebook ?
            req.body.links.facebook :
            societyLinks.facebook,
          logo: req.body.links.logo ? req.body.links.logo : societyLinks.logo,
          banner: req.body.links.banner ?
            req.body.links.banner :
            societyLinks.banner,
        },
      });
      console.log(updateSocietyLinks);
    }

    res.status(200).send({message: 'Society Updated'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Add a committee member to a society
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {res} Confirmation message
 */
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

    if (!committee) {
      res.status(401).send({message: 'Unauthorized'});
      return;
    }

    // Get the user from the email
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.status(404).send({message: 'User Not Found'});
      return;
    }

    // Check if the user is already a committee member
    const isCommitteeMember = await prisma.committee.findMany({
      where: {
        userId: user.id,
        societyId: req.body.societyId,
      },
    });

    if (isCommitteeMember) {
      res.status(400).send({message: 'User is already a committee member'});
      return;
    }

    // Add the user to the committee
    await prisma.committee.create({
      data: {
        userId: user.id,
        societyId: req.body.societyId,
        isPresident: false,
        role: req.body.role,
      },
    });

    res.status(200).send({message: 'User added to committee'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Remove a committee member from a society
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {res} Confirmation message
 */
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

    if (!committee) {
      res.status(401).send({message: 'Unauthorized'});
      return;
    }

    // Check if the user is a committee member
    const isCommitteeMember = await prisma.committee.findMany({
      where: {
        userId: req.body.userId,
        societyId: req.body.societyId,
      },
    });

    if (!isCommitteeMember) {
      res.status(400).send({message: 'User is not a committee member'});
      return;
    }

    // Remove the user from the committee
    await prisma.committee.delete({
      where: {
        id: req.body.committeeId,
      },
    });

    res.status(200).send({message: 'User removed from committee'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Update a committee member
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {res} Confirmation message
 */
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

    if (!committee) {
      res.status(401).send({message: 'Unauthorized'});
      return;
    }

    // Check if the user is a committee member
    const isCommitteeMember = await prisma.committee.findMany({
      where: {
        userId: req.body.userId,
        societyId: req.body.societyId,
      },
    });

    if (!isCommitteeMember) {
      res.status(400).send({message: 'User is not a committee member'});
      return;
    }

    // Update the user's role in the committee
    await prisma.committee.update({
      where: {
        userId: req.body.userId,
        societyId: req.body.societyId,
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
      await prisma.committee.update({
        where: {
          userId: userId,
          societyId: req.body.societyId,
        },
        data: {
          isPresident: false,
        },
      });
    }

    res.status(200).send({message: 'User updated in committee'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Follow a society
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {res} Confirmation message
 */
async function followSociety(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    // Check if the user is already following the society
    const isFollowing = await prisma.following.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    if (isFollowing) {
      res.status(400).send({message: 'User is already following society'});
      return;
    }

    // Add the user to the following list
    await prisma.following.create({
      data: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    res.status(200).send({message: 'User is now following society'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Unfollow a society
 * @param {req} req The request object
 * @param {res} res The response object
 * @return {res} Confirmation message
 */
async function unfollowSociety(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    // Check if the user is following the society
    const isFollowing = await prisma.following.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    if (!isFollowing) {
      res.status(400).send({message: 'User is not following society'});
      return;
    }

    // Remove the user from the following list
    await prisma.following.delete({
      where: {
        userId_societyId: {
          userId: userId,
          societyId: req.body.societyId,
        },
      },
    });

    res.status(200).send({message: 'User is no longer following society'});
  } catch (err) {
    console.log(err);
    res.status(500).send({message: 'Internal Server Error'});
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
  followSociety,
  unfollowSociety,
};
