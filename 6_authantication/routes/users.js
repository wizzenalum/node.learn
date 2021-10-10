const express = require('express');

const router = express.Router();

const userControler = require('../controlers/users_controler');

router.get('/signup',userControler.signup);
router.get('/signin',userControler.signin);
router.post('/create-user',userControler.createUser);
router.post('/create-session',userControler.createSession);
router.get('/profile',userControler.profile);
router.get('/signout',userControler.signout);

module.exports = router;