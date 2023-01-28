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
router.patch('/sendConnectionRequest', controller.sendConnectionRequest);

//respond to a connection request
router.patch('/respondToConnectionRequest', controller.respondToConnectionRequest);

//update user info - use this for hiding recipes and cookbooks also.
router.patch('/update', controller.updateUser)

//get user info
router.get('/', controller.getUser);

module.exports = router;