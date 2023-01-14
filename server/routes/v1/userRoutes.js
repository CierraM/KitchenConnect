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

//update user info
router.post('/update');

//hide a recipe

//unhide a recipe

//hide a cookbook

//unhide a cookbook

module.exports = router;