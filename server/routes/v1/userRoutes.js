const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/userController');
const auth = require('../../auth/auth');

//signup new user
router.post('/signup', controller.signup);

//login
router.post('/login', controller.login);

//fetch all recipes and cookbooks that belong to a user
router.get('/myRecipes', controller.getMyRecipes);

//fetch all favorite recipes for a user
router.get('/favorites', controller.getUserFavorites);

//search for user by id, name, or username
router.get('/search', controller.searchForUser);

//send a connection request
router.post('/sendConnectionRequest', controller.sendConnectionRequest);

//respond to a connection request
router.post('/respondToConnectionRequest', controller.respondToConnectionRequest);

//hide a recipe

//unhide a recipe

//hide a cookbook

//unhide a cookbook

//get user info

//update user info

module.exports = router;