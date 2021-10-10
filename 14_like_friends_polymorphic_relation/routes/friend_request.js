const express = require('express');
const router = express.Router();

const friendController = require('../controllers/friend_controller') 

router.get('/send/:id',friendController.sendRequest);
router.get('/confirm/:id',friendController.confirmRequest);
router.get('/delete-friend/:id',friendController.deleteFriend);
router.get('/delete/:id',friendController.deleteRequest);


module.exports = router;