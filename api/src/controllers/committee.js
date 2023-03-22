const prisma = require('../../prisma/prisma.js');
const auth = require('../utils/jwt_auth.js');

/**
 * Add a committee member to a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function addCommitteeMember(req, res) {
  let decoded = null;
  try {
    // Authenticate the user

    decoded = await auth.authenticate(req);
  } catch (err) {
    return res.status(400).send({message: 'Unauthorized'});
  }

  // Check that the request body contains an email and societyId
  if (!req.body.email || !req.body.societyId) {
    return res.status(400).send({message: 'Invalid Request'});
  }

  // Check if user is a committee member of the society
  const committee = await prisma.committee.findMany({
    where: {
      userId: decoded.id,
      societyId: req.body.societyId,
    },
  });
  if (committee.length === 0) {
    return res.status(400).send({message: 'Unauthorized'});
  }

  // Find the user
  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (user === null) {
    return res.status(400).send({message: 'User does not exist'});
  }

  // Check if user is already a committee member
  const committeeMember = await prisma.committee.findMany({
    where: {
      userId: user.id,
      societyId: req.body.societyId,
    },
  });

  if (committeeMember.length > 0) {
    return res
        .status(400)
        .send({message: 'User is already a committee member'});
  }

  // Add the user to the committee
  await prisma.committee.create({
    data: {
      userId: user.id,
      societyId: req.body.societyId,
      isPresident: false,
      role: 'committee member',
    },
  });

  return res.status(200)
      .send({message: 'User added to committee', userId: user.id});
}

/**
 * Remove a committee member from a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 * @return {Response} The response object
 */
async function removeCommitteeMember(req, res) {
  let decoded = null;
  try {
    // Authenticate the user
    decoded = (await auth.authenticate(req));
  } catch (err) {
    return res.status(500).send({message: 'Internal Server Error'});
  }
  // Check that the request body contains a userId and societyId
  if (!req.body.userId || !req.body.societyId) {
    return res.status(400).send({message: 'Invalid Request'});
  }

  // Check that the userId and the societyId are positive integers and are of
  // type number
  if (typeof req.body.userId !== 'number' ||
    typeof req.body.societyId !== 'number' ||
    req.body.userId < 0 ||
    req.body.societyId < 0) {
    return res.status(400).send({message: 'Invalid Request'});
  }

  // Check that user exists
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.userId,
    },
  });

  if (user === null) {
    return res.status(400).send({message: 'User does not exist'});
  }

  // Check that society exists
  const society = await prisma.society.findUnique({
    where: {
      id: req.body.societyId,
    },
  });

  if (society === null) {
    return res.status(400).send({message: 'Society does not exist'});
  }

  // Check if user is a committee member of the society
  const isCommittee = await prisma.committee.findFirst({
    where: {
      userId: decoded.id,
      societyId: req.body.societyId,
    },
  });

  if (!isCommittee) {
    return res.status(400).send({message: 'Unauthorized'});
  }

  // Check if user is a committee member of the society
  const isCommitteeMember = await prisma.committee.findFirst({
    where: {
      userId: req.body.userId,
      societyId: req.body.societyId,
    },
  });

  if (!isCommitteeMember) {
    return res.status(400).send({message: 'User is not a committee member'});
  }

  // Check if user is president
  const isPresident = await prisma.committee.findFirst({
    where: {
      userId: req.body.userId,
      societyId: req.body.societyId,
      isPresident: true,
    },
  });

  if (isPresident) {
    return res.status(400).send({message: 'Cannot remove president'});
  }

  // Remove the user from the committee
  await prisma.committee.deleteMany({
    where: {
      userId: req.body.userId,
      societyId: req.body.societyId,
    },
  });

  res.status(200).send({message: 'User removed from committee'});
}

/**
 * Get all committee members of a society
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function getCommitteeMembers(req, res) {
  if (!req.body.societyId) {
    return res.status(400).send({message: 'Missing societyId'});
  }
  const committee = await prisma.committee.findMany({
    where: {
      societyId: req.body.societyId,
    },
    select: {
      user: true,
      role: true,
    },
  });

  for (let i = 0; i < committee.length; i++) {
    committee[i].email = committee[i].user.email;
  }

  return res
      .status(200)
      .send({message: 'Committee members found', committee: committee});
}

/**
 * Checks if user is a committee member
 * @param {Request} req The request object
 * @param {Response} res The response object
 */
async function checkIfUserIsCommitteeMember(req, res) {
  let decoded = null;
  try {
    // Authenticate the user
    decoded = await auth.authenticate(req);
  } catch (err) {
    return res.status(400).send({message: 'Unauthorized'});
  }

  if (!req.body.eventId) {
    res.status(400).send({message: 'Missing eventId'});
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
    return res.status(404).send({message: 'Event not found'});
  }

  const committee = await prisma.committee.findMany({
    where: {
      userId: decoded.id,
      societyId: event.societyId,
    },
  });

  if (committee.length === 0) {
    return res.status(200).send({isCommitteeMember: false});
  }

  return res.status(200).send({isCommitteeMember: true});
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
      res.status(400).send({message: 'Missing societyId'});
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
      res.status(200).send({isPresident: false});
      return;
    }


    res.status(200).send({isPresident: true});
  } catch (err) {
    res.status(500).send({message: 'Internal Server Error'});
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
    res.status(401).send({message: 'Unauthorized'});
    return;
  }

  // Check that the req body has a societyId and userId
  if (!req.body.societyId || !req.body.userId) {
    res.status(400).send({message: 'Missing societyId or userId'});
    return;
  }

  // Check that the society exists
  const society = await prisma.society.findUnique({
    where: {
      id: req.body.societyId,
    },
  });

  if (!society) {
    res.status(404).send({message: 'Society not found'});
    return;
  }

  // Check that the user exists
  const user = await prisma.user.findUnique({
    where: {
      id: req.body.userId,
    },
  });

  if (!user) {
    res.status(404).send({message: 'User not found'});
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
    res.status(400).send({message: 'User is not a committee member'});
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
    res.status(400).send({message: 'User is not a president'});
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
    res.status(400).send({message: 'User is already president'});
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
      role: 'Committee Member',
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
      role: 'President',
    },
  });

  res.status(200).send({message: 'President changed'});
}

module.exports = {
  addCommitteeMember,
  removeCommitteeMember,
  getCommitteeMembers,
  checkIfUserIsCommitteeMember,
  checkIfUserIsPresident,
  changePresident,
};
