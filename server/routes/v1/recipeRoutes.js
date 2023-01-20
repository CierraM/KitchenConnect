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
router.delete('/delete/:id', controller.deleteRecipe);

//unlink a recipe from a user - take them off the readonly list
router.post('/unlinkFromUser', controller.removeFromUser);

//unlink a recipe from a group - take the group off the group readonly list
router.post('/unlinkFromGroup', controller.removeFromGroup);

//update a recipe by id - must be owner
router.put('/update', controller.updateRecipe);

//get all public recipes (maybe we need to paginate this one)
router.get('/', controller.getAllPublicRecipes);

module.exports = router;