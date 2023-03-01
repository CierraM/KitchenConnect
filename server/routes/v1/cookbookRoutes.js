const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/cookbookController');
const { isAuth } = require('../../auth/auth');
const { body } = require('express-validator');

//create a cookbook
router.post(
    '/create',
    isAuth,
    body('title').optional().isString().trim(),
    body('recipes').optional().isArray(),
    controller.createCookbook
);

router.get('/:id', controller.getCookbook)

//add a new recipe to a cookbook
router.patch(
    '/addRecipe',
    isAuth,
    body('cookbookId').isString(),
    body('recipeId').isString(),
    controller.addRecipe
);

//remove a recipe from a cookbook
router.patch(
    '/removeRecipe',
    isAuth,
    body('cookbookId').isString(),
    body('recipeId').isString(),
    controller.removeRecipe
);

//share cookbook
router.patch(
    '/shareWithUser',
    isAuth,
    body('cookbookId').isString(),
    body('recipientUserId').isString(),
    body('permissionLevel', 'Permission level field allows values \'read\' or \'write\' only').optional().trim().isString(),
    controller.shareWithUser
)
router.patch(
    '/shareWithGroup',
    isAuth,
    body('cookbookId').isString(),
    body('recipientGroupId').isString(),
    body('permissionLevel', 'Permission level field allows values \'read\' or \'write\' only').optional().trim().isString(),
    controller.shareWithGroup
)

//update a cookbook by id - must be owner
router.patch(
    '/update',
    isAuth,
    body('cookbookId').isString(),
    controller.updateCookbook
);

//unlink a cookbook from a group
router.patch(
    '/unlinkFromGroup',
    isAuth,
    body('groupId').isString(),
    body('cookbookId').isString(),
    controller.unlinkCookbookFromGroup
);

//unshare a cookbook from a user
router.patch(
    '/unlinkFromUser',
    isAuth,
    body('cookbookId').isString(),
    controller.unlinkCookbookFromUser
)

//delete cookbook
router.delete(
    '/delete',
    isAuth,
    body('cookbookId').isString(),
    controller.deleteCookbook
)


module.exports = router;