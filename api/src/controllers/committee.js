/**
 * Add a committee member to a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 * 
 */

const auth = require('../utils/jwt_auth.js');

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
      res.status(401).send({ message: "User not part of committee" });
      return;
    }

    if (committee[0].isPresident === false) {
      res.status(400).send({
        message: "Only the president is able to update the committee",
      });

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
    await prisma.committee.create({
      data: {
        userId: user.id,
        societyId: req.body.societyId,
        isPresident: false,
        role: req.body.role,
      },
    });

    res
      .status(200)
      .send({ message: "User added to committee", userId: user.id });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * Remove a committee member from a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
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

    if (committee.length === 0) {
      res.status(401).send({ message: "Unauthorized" });

      return;
    }

    if (committee[0].isPresident === false) {
      res.status(400).send({ message: "User must be a President" });

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

    if (isCommitteeMember[0].isPresident === true) {
      res.status(400).send({ message: "Cannot remove the president" });

      return;
    }

    // Remove the user from the committee
    await prisma.committee.delete({
      where: {
        userId_societyId: {
          userId: req.body.userId,
          societyId: req.body.societyId,
        },
      },
    });

    res.status(200).send({ message: "User removed from committee" });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * Update a committee member's role
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function updateCommitteeMember(req, res) {
  let userId = null;
  try {
    // Authenticate the user
    userId = (await auth.authenticate(req)).id;
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
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

  if (isCommitteeMember.length == 0) {
    res.status(400).send({ message: "User is not a committee member" });
    return;
  }

  // Update the user's role in the committee
  await prisma.committee.update({
    where: {
      userId_societyId: {
        userId: req.body.userId,
        societyId: req.body.societyId,
      },
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

  res.status(200).send({ message: "User updated in committee" });
}

/**
 * Get all committee members of a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function getCommitteeMembers(req, res) {
  try {
    if (!req.body.societyId) {
      res.status(400).send({ message: "Missing societyId" });
      return;
    }

    const committee = await prisma.committee.findMany({
      where: {
        societyId: req.body.societyId,
      },
      select: {
        userId: true,
        role: true,
      },
    });

    if (committee.length === 0) {
      res.status(404).send({ message: "No committee members found" });
      return;
    }

    for (let i = 0; i < committee.length; i++) {
      const user = await prisma.user.findUnique({
        where: {
          id: committee[i].userId,
        },
        select: {
          email: true,
        },
      });
      committee[i].email = user.email;
    }

    res
      .status(200)
      .send({ message: "Committee members found", committee: committee });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * Checks if user is a committee member
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function checkIfUserIsCommitteeMember(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    if (!req.body.eventId) {
      res.status(400).send({ message: "Missing eventId" });
      return;
    }

    const event = await prisma.event.findUnique({
      where: {
        id: req.body.eventId,
      },
      select: {
        societyId: true,
      },
    });

    if (!event) {
      res.status(404).send({ message: "Event not found" });
      return;
    }

    const committee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: event.societyId,
      },
    });

    if (committee.length === 0) {
      res.status(200).send({ isCommitteeMember: false });
      return;
    }

    res.status(200).send({ isCommitteeMember: true });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * Checks if user is president of a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function checkIfUserIsPresident(req, res) {
  try {
    // Authenticate the user

    const userId = (await auth.authenticate(req)).id;


    if (!req.body.societyId) {
      res.status(400).send({ message: "Missing societyId" });
      return;
    }


    const president = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
        isPresident: true,
      },
    });


    if (president.length === 0) {
      res.status(200).send({ isPresident: false });
      return;
    }
 

    res.status(200).send({ isPresident: true });
  } catch (err) {
    res.status(500).send({ message: "Internal Server Error" });
  }
}

/**
 * Change the society president
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function changePresident(req, res) {
  let decoded = null;
  try {
    // Authenticate the user
    decoded = await auth.authenticate(req);
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
    return;
  }

  // Check that the req body has a societyId and userId
  if (!req.body.societyId || !req.body.userId) {
    res.status(400).send({ message: "Missing societyId or userId" });
    return;
  }

  // Check that the society exists
  const society = await prisma.society.findUnique({
    where: {
      id: req.body.societyId,
    },
  });

  if (!society) {
    res.status(404).send({ message: "Society not found" });
    return;
  }

  // Check that the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.userId,
    },
  });

  if (!user) {
    res.status(404).send({ message: "User not found" });
    return;
  }

  // Check that the user is a committee member
  const isCommittee = await prisma.committee.findMany({
    where: {
      userId: req.body.userId,
      societyId: req.body.societyId,
    },
  });

  if (isCommittee.length === 0) {
    res.status(400).send({ message: "User is not a committee member" });
    return;
  }

  // Check that the user is a president
  const findPresident = await prisma.committee.findMany({
    where: {
      userId: decoded.id,
      societyId: req.body.societyId,
      isPresident: true,
    },
  });

  if (findPresident.length === 0) {
    res.status(400).send({ message: "User is not a president" });
    return;
  }

  // Check that the user is not already president
  const isAlreadyPresident = await prisma.committee.findMany({
    where: {
      userId: req.body.userId,
      societyId: req.body.societyId,
      isPresident: true,
    },
  });

  if (isAlreadyPresident.length > 0) {
    res.status(400).send({ message: "User is already president" });
    return;
  }

  // Change the president
  await prisma.committee.updateMany({
    where: {
      societyId: req.body.societyId,
      isPresident: true,
    },
    data: {
      isPresident: false,
      role: "Committee Member",
    },
  });

  await prisma.committee.update({
    where: {
      userId_societyId: {
        userId: req.body.userId,
        societyId: req.body.societyId,
      },
    },
    data: {
      isPresident: true,
      role: "President",
    },
  });

  res.status(200).send({ message: "President changed" });
}

module.exports = {
  addCommitteeMember,
  removeCommitteeMember,
  updateCommitteeMember,
  getCommitteeMembers,
  checkIfUserIsCommitteeMember,
  checkIfUserIsPresident,
  changePresident,
};
