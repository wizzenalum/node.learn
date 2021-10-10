const express = require('express');
const router = express.Router();
const postController = require('../../../controllers/api/v1/posts_api');
const passport = require('passport');


router.get('/index',passport.authenticate('jwt',{session:false}),postController.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),postController.destroy);

module.exports = router