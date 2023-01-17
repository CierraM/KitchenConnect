const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/recipeController')

//create a new recipe
router.post('/create', controller.createRecipe);

//get a recipe by id
router.get('/:id', controller.getRecipeById);

//share recipe with a user or group - need user id and recipe id
router.post('/share', controller.shareRecipeWithUser);

//delete a recipe by id - must be owner

//unlink a recipe from a user - take them off the readonly list

//unlink a recipe from a group - take the group off the group readonly list

//get all public recipes (maybe we need to paginate this one)

//update a recipe by id - must be owner

module.exports = router;