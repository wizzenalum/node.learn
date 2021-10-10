const express = require('express');

const router = express.Router();


const postController = require('../controlers/post_controler');

router.get('/image',postController.image);

module.exports = router;
