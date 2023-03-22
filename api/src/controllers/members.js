// SOCIETY CONTROLLER
const prisma = require('../../prisma/prisma.js');
const auth = require('../utils/jwt_auth.js');

/**
 * User can follow a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function followSociety(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    if (!req.body.societyId) {
      res.status(400).send({message: 'Missing societyId'});
      return;
    }

    // CHeck that the society exists
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });

    if (!society) {
      res.status(404).send({message: 'Society not found'});
      return;
    }

    const member = await prisma.members.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    if (member.length > 0) {
      // res.status(400).send({message: 'User is already a member'});
      if (member[0].isArchived === true) {
        await prisma.members.update({
          where: {
            userId_societyId: {
              userId: userId,
              societyId: req.body.societyId,
            },
          },
          data: {
            isArchived: false,
          },
        });
        res.status(200).send({message: 'User is now a member'});
        return;
      } else {
        res.status(400).send({message: 'User is already a member'});
        return;
      }
    }

    await prisma.members.create({
      data: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    res.status(200).send({message: 'User is now a member'});
  } catch (err) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * User can unfollow a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function unfollowSociety(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    if (!req.body.societyId) {
      res.status(400).send({message: 'Missing societyId'});
      return;
    }

    // CHeck that the society exists
    const society = await prisma.society.findUnique({
      where: {
        id: req.body.societyId,
      },
    });

    if (!society) {
      res.status(404).send({message: 'Society not found'});
      return;
    }

    const member = await prisma.members.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    if (member.length === 0) {
      res.status(400).send({message: 'User is not a member'});
      return;
    }

    if (member[0].isArchived === true) {
      res.status(400).send({message: 'User is already not a member'});
      return;
    }

    await prisma.members.update({
      where: {
        userId_societyId: {
          userId: userId,
          societyId: req.body.societyId,
        },
      },
      data: {
        isArchived: true,
      },
    });

    res.status(200).send({message: 'User is no longer a member'});
  } catch (err) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Checks if user isa memebr a society
 * @param {Request} req The request object
 *  @param {Response} res The response object
 */
async function checkUserIsMember(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    if (!req.body.societyId) {
      res.status(400).send({message: 'Missing societyId'});
      return;
    }

    const member = await prisma.members.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
        isArchived: false,
      },
    });

    if (member.length === 0) {
      res.status(200).send({message: 'User is not a member', isMember: false});
      return;
    }

    res.status(200).send({message: 'User is a member', isMember: true});
  } catch (err) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * Gets all members of a society
 * Checks if user requesting this data is a committee member
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function getMembers(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    if (!req.body.societyId) {
      res.status(400).send({message: 'Missing societyId'});
      return;
    }

    const commitee = await prisma.committee.findMany({
      where: {
        userId: userId,
        societyId: req.body.societyId,
      },
    });

    if (commitee.length === 0) {
      res.status(400).send({message: 'User is not a committee member'});
      return;
    }

    const members = await prisma.members.findMany({
      where: {
        societyId: req.body.societyId,
        isArchived: false,
      },
      select: {
        userId: true,
      },
    });

    if (members.length === 0) {
      res.status(404).send({message: 'No members found'});
      return;
    }

    const userIds = members.map((member) => member.userId);

    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.status(200).send({message: 'Members found', members: users});
  } catch (err) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}

/**
 * User can see a list of societies they follow
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function getListOfFollowedSocieties(req, res) {
  try {
    // Authenticate the user
    const userId = (await auth.authenticate(req)).id;

    const societies = await prisma.members.findMany({
      where: {
        userId: userId,
        isArchived: false,
      },
      select: {
        societyId: true,
      },
    });

    if (societies.length === 0) {
      res.status(404).send({message: 'No societies found'});
      return;
    }

    res.status(200).send({message: 'Societies found', societies: societies});
  } catch (err) {
    res.status(500).send({message: 'Internal Server Error'});
  }
}

module.exports = {
  followSociety,
  unfollowSociety,
  checkUserIsMember,
  getMembers,
  getListOfFollowedSocieties,
};