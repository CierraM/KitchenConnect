const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/recipeController')
const { isAuth } = require('../../auth/auth');
const { body } = require('express-validator');

//create a new recipe
router.post(
    '/create',
    isAuth,
    body('title').isString(),
    body('tags').optional().isArray(),
    body('ingredients').optional().isArray(),
    body('steps').optional().isArray(),
    body('related').optional().isArray(),
    body('userPermissions').optional().isObject(),
    body('groupPermissions').optional().isObject(),
    body('cookbookIds').optional().isArray(),
    body('private').optional().isBoolean(),
    controller.createRecipe
);

//get a recipe by id
router.get('/:id', controller.getRecipeById);

//share recipe with a user or group
router.patch(
    '/shareWithUser',
    isAuth,
    body('recipeId').isString(),
    body('recipientUser').isString(),
    controller.shareRecipeWithUser
);
router.patch(
    '/shareWithGroup',
    isAuth,
    body('recipeId').isString(),
    body('recipientGroup').isString(),
    controller.shareRecipeWithGroup
);
    
//delete a recipe by id - must be owner
router.delete('/delete/:id', isAuth, controller.deleteRecipe);

//unlink a recipe from a user - take them off the readonly list
router.patch(
    '/unlinkFromUser',
    isAuth,
    body('userId').isString(),
    controller.removeFromUser
);

//unlink a recipe from a group - take the group off the group readonly list
router.patch(
    '/unlinkFromGroup',
    isAuth,
    controller.removeFromGroup
);

//update a recipe by id - must be owner
router.patch(
    '/update',
    isAuth,
    body('recipeId').isString(),
    body('changes').isJSON(),
    controller.updateRecipe
);

//get all public recipes (maybe we need to paginate this one)
router.get('/', controller.getAllPublicRecipes);

module.exports = router;