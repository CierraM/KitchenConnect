const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/userController');
const auth = require('../../auth/auth');

//signup new user
router.post('/signup', controller.signup);

//login
router.post('/login', controller.login);

//fetch all recipes and cookbooks that belong to a user
router.get('/:userId/recipes');

//fetch all favorite recipes for a user
router.get('/:userId/favorites');

//update user info
router.post('/:userId/update');

module.exports = router;