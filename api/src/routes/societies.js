// SOCIETIES ROUTE
const express = require('express');
/* eslint-disable-next-line */
const router = express.Router();
const societyController = require('../controllers/societies.js');

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
  societyController.addCommitteeMember(req, res);
});

router.post('/removeCommitteeMember', (req, res) => {
  societyController.removeCommitteeMember(req, res);
});

router.post('/updateCommitteeMember', (req, res) => {
  societyController.updateCommitteeMember(req, res);
});

router.post('/getCommitteeMembers', (req, res) => {
  societyController.getCommitteeMembers(req, res);
});

router.post('/followSociety', (req, res) => {
  societyController.followSociety(req, res);
});

router.post('/unFollowSociety', (req, res) => {
  societyController.unFollowSociety(req, res);
});

router.post('/checkUserIsMember', (req, res) => {
  societyController.checkUserIsMember(req, res);
});

router.post('/getMembers', (req, res) => {
  societyController.getMembers(req, res);
});

router.post('/getFollowedSocieties', (req, res) => {
  societyController.getListOfFollowedSocieties(req, res);
});

router.post('/checkCommitteeMember', (req, res) => {
  societyController.checkIfUserIsCommitteeMember(req, res);
});

router.post('/checkPresident', (req, res) => {
  societyController.checkIfUserIsPresident(req, res);
});

// router.post('/unfollowSociety', (req, res) => {
//   societyController.unfollowSociety(req, res);
// });

// router.post('/getFollowedSocieties', (req, res) => {
//   societyController.getFollowedSocieties(req, res);
// });

router.post('/changePresident', (req, res) => {
  societyController.changePresident(req, res);
});

module.exports = router;
