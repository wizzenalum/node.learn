//this file link all the routes to the index bia router of express.
const express = require('express');
const router = express.Router();

const homeControler = require('../controlers/home_controler');// import the contorller


router.get('/',homeControler.home);  // setting the path for / req
router.get('/contact',homeControler.contact);

router.use('/user',require('./users'))
router.use('/post',require('./post'));

module.exports = router; // exporting the router .