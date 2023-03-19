const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/userController');
const { isAuth } = require('../../auth/auth');
const { body } = require('express-validator');

//signup new user
router.post(
    '/signup',
    body('username').isString(),
    body('password'),
    body('email').normalizeEmail(),
    body('firstName').optional().isString(),
    body('lastName').optional().isString(),
    controller.signup
);

//login
router.post(
    '/login',
    controller.login
);

//fetch all recipes and cookbooks that belong to a user
router.get('/myRecipes', isAuth, controller.getMyRecipes);

router.get('/logout', controller.logout);
//fetch all favorite recipes for a user
router.get('/favorites', isAuth, controller.getUserFavorites);

//search for user by id, name, or username
router.get('/search', controller.searchForUser);

//send a connection request
router.patch(
    '/sendConnectionRequest',
    isAuth,
    body('toUser').isString(),
    controller.sendConnectionRequest
);

//respond to a connection request
router.patch(
    '/respondToConnectionRequest',
    isAuth,
    body('fromUser').isString(),
    body('accept').isBoolean(),
    controller.respondToConnectionRequest
);

//update user info - use this for hiding recipes and cookbooks also.
router.patch(
    '/update',
    isAuth,
    controller.updateUser
)

//get user info
router.get('/', isAuth, controller.getUser);

//get a list of users
router.get('/all', isAuth, controller.getAllUsers)

module.exports = router;