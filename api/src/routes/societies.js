// SOCIETIES ROUTE
const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();
const societyController = require('../controllers/societies.js');
const committeeController = require('../controllers/committee.js');
const memberController = require('../controllers/members.js');

// This route is used to create a society
router.post('/signup', (req, res) => {
  societyController.signup(req, res);
});

router.get('/getSocieties', (req, res) => {
  societyController.getSocieties(req, res);
});

router.post('/getSociety', (req, res) => {
  societyController.getSocietyById(req, res);
});

router.post('/updateSociety', (req, res) => {
  societyController.updateSociety(req, res);
});

router.post('/deleteSociety', (req, res) => {
  societyController.deleteSociety(req, res);
});

router.post('/addCommitteeMember', (req, res) => {
  committeeController.addCommitteeMember(req, res);
});

router.post('/removeCommitteeMember', (req, res) => {
  committeeController.removeCommitteeMember(req, res);
});

router.post('/updateCommitteeMember', (req, res) => {
  committeeController.updateCommitteeMember(req, res);
});

router.post('/getCommitteeMembers', (req, res) => {
  committeeController.getCommitteeMembers(req, res);
});

router.post('/followSociety', (req, res) => {
  console.log(req.body);
  memberController.followSociety(req, res);
});

router.post('/unfollowSociety', (req, res) => {
  console.log(req.body);
  memberController.unfollowSociety(req, res);
});

router.post('/checkUserIsMember', (req, res) => {
  memberController.checkUserIsMember(req, res);
});

router.post('/getMembers', (req, res) => {
  memberController.getMembers(req, res);
});

router.post('/getFollowedSocieties', (req, res) => {
  memberController.getListOfFollowedSocieties(req, res);
});

router.post('/checkCommitteeMember', (req, res) => {
  committeeController.checkIfUserIsCommitteeMember(req, res);
});

router.post('/checkPresident', (req, res) => {
  committeeController.checkIfUserIsPresident(req, res);
});

router.post('/changePresident', (req, res) => {
  committeeController.changePresident(req, res);
});

module.exports = router;
