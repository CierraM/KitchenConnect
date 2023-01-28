const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/cookbookController');

//create a cookbook
router.post('/create', controller.createCookbook);

//add a new recipe to a cookbook
router.patch('/addRecipe', controller.addRecipe);

//remove a recipe from a cookbook
router.patch('/removeRecipe', controller.removeRecipe);

//share cookbook
router.patch('/shareWithUser', controller.shareWithUser)
router.patch('/shareWithGroup', controller.shareWithGroup)

//update a cookbook by id - must be owner
router.patch('/update', controller.updateCookbook);

//unlink a cookbook from a group
router.patch('/unlinkFromGroup', controller.unlinkCookbookFromGroup);

//unshare a cookbook from a user
router.patch('/unlinkFromUser', controller.unlinkCookbookFromUser)

//delete cookbook
router.delete('/delete', controller.deleteCookbook)


module.exports = router;