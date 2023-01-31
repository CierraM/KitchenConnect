const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/cookbookController');
const {isAuth} = require('../../auth/auth');

//create a cookbook
router.post('/create', isAuth, controller.createCookbook);

//add a new recipe to a cookbook
router.patch('/addRecipe', isAuth, controller.addRecipe);

//remove a recipe from a cookbook
router.patch('/removeRecipe', isAuth, controller.removeRecipe);

//share cookbook
router.patch('/shareWithUser', isAuth, controller.shareWithUser)
router.patch('/shareWithGroup', isAuth, controller.shareWithGroup)

//update a cookbook by id - must be owner
router.patch('/update', isAuth, controller.updateCookbook);

//unlink a cookbook from a group
router.patch('/unlinkFromGroup', isAuth, controller.unlinkCookbookFromGroup);

//unshare a cookbook from a user
router.patch('/unlinkFromUser', isAuth, controller.unlinkCookbookFromUser)

//delete cookbook
router.delete('/delete', isAuth, controller.deleteCookbook)


module.exports = router;