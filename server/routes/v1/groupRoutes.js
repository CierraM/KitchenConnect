const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/groupController');

//create a group
router.post('/create', controller.createGroup);

//add a members to a group
router.patch('/addMembers', controller.addMembers);

//remove a member from a group
router.patch('/removeMember', controller.removeMember);

//get all recipes and cookbooks that a group can see
router.get('/:id/getRecipes', controller.getGroupRecipes);

//register a new admin
router.patch('/registerAdmin', controller.registerAdmin);

//remove a group admin
router.patch('/removeAdmin', controller.removeAdmin)

//see all groups that a user is part of
router.get('/userGroups', controller.getUserGroups);

//delete a group
router.delete('/delete', controller.deleteGroup)

module.exports = router;