const express = require('express');
const { authenticate } = require('passport');
const passport = require('passport');

const router = express.Router();

const userControler = require('../controlers/users_controler');

router.get('/profile',passport.checkauthentication,userControler.profile);
router.get('/signup',passport.isUserSignedin,userControler.signup);
router.get('/signin',passport.isUserSignedin,userControler.signin);
router.post('/create-user',userControler.createUser);

// use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'},
),userControler.createSession);


router.get('/signout',userControler.signout);

module.exports = router;