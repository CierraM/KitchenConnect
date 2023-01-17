const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/groupController');

//create a group
router.post('/create', controller.createGroup);

//add a members to a group
router.post('/addMembers', controller.addMembers);

//remove a member from a group
router.post('/removeMember', controller.removeMember)

//get all recipes and cookbooks that a group can see
router.get('/:id/getRecipes', controller.getGroupRecipes)

//register a new admin

//remove a group admin

//see all groups that a user is part of

//delete a group


module.exports = router;