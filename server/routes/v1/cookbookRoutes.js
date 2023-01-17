const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/cookbookController');

//create a cookbook
router.post('/create', controller.createCookbook);

//add a new recipe to a cookbook
router.post('/addRecipe', controller.addRecipe);

//remove a recipe from a cookbook
router.post('/removeRecipe', controller.removeRecipe);

//share cookbook with a group

//share cookbook with a user

//update a cookbook's name

//delete a cookbook - remove from where the user can see it, but does not actually remove it from existance

//unshare a cookbook from a user

//unlink a cookbook from a group

module.exports = router;