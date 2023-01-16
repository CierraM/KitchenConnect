const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/recipeController')

//create a new recipe
router.post('/create', controller.createRecipe);
//get a recipe by id
router.get('/:id', controller.getRecipeById)
//update a recipe by id - must be owner

//delete a recipe by id - must be owner

//share recipe with a user - need user id and recipe id

//share recipe with a group

//unlink a recipe from a user - take them off the readonly list

//unlink a recipe from a group - take the group off the group readonly list

//get all public recipes (maybe we need to paginate this one)

module.exports = router;