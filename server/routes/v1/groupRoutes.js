const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/groupController');
const {isAuth} = require('../../auth/auth');

//create a group
router.post('/create', isAuth, controller.createGroup);

//add a members to a group
router.patch('/addMembers', isAuth, controller.addMembers);

//remove a member from a group
router.patch('/removeMember', isAuth, controller.removeMember);

//get all recipes and cookbooks that a group can see
router.get('/:id/getRecipes', isAuth, controller.getGroupRecipes);

//register a new admin
router.patch('/registerAdmin', isAuth, controller.registerAdmin);

//remove a group admin
router.patch('/removeAdmin', isAuth, controller.removeAdmin)

//see all groups that a user is part of
router.get('/userGroups', isAuth, controller.getUserGroups);

//delete a group
router.delete('/delete', isAuth, controller.deleteGroup)

module.exports = router;