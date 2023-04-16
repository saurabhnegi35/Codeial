const express = require('express');
const passport = require('passport');


const router = express.Router();
const likesController = require('../controllers/likes_controller');

router.post('/toggle',passport.checkAuthentication, likesController.toggleLike)


module.exports = router;