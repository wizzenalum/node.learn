const express = require('express');
const router  = express.Router();


const userControlers = require('../controlers/users_controler');

router.get('/profile',userControlers.profile);



module.exports = router;