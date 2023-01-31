const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/recipeController')
const {isAuth} = require('../../auth/auth');

//create a new recipe
router.post('/create', isAuth, controller.createRecipe);

//get a recipe by id
router.get('/:id', isAuth, controller.getRecipeById);

//share recipe with a user or group
router.patch('/shareWithUser', isAuth, controller.shareRecipeWithUser);
router.patch('/shareWithGroup', isAuth, controller.shareRecipeWithGroup)
    ;
//delete a recipe by id - must be owner
router.delete('/delete/:id', isAuth, controller.deleteRecipe);

//unlink a recipe from a user - take them off the readonly list
router.patch('/unlinkFromUser', isAuth, controller.removeFromUser);

//unlink a recipe from a group - take the group off the group readonly list
router.patch('/unlinkFromGroup', isAuth, controller.removeFromGroup);

//update a recipe by id - must be owner
router.patch('/update', isAuth, controller.updateRecipe);

//get all public recipes (maybe we need to paginate this one)
router.get('/', controller.getAllPublicRecipes);

module.exports = router;