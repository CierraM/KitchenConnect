const express = require('express');
const router = express.Router();
const controller = require('../../controllers/v1/groupController');
const { isAuth } = require('../../auth/auth');
const { body } = require('express-validator');

//create a group
router.post(
    '/create',
    isAuth,
    body('groupName', 'You must supply a group name').isString(),
    controller.createGroup
);

//add a members to a group
router.patch(
    '/addMembers',
    isAuth,
    body('memberIds').isArray(),
    body('groupId').isString(),
    controller.addMembers
);

//remove a member from a group
router.patch(
    '/removeMember',
    isAuth,
    body('memberId').isString(),
    body('groupId').isString(),
    controller.removeMember
);

//get all recipes and cookbooks that a group can see
router.get('/:id/getRecipes', isAuth, controller.getGroupRecipes);

//register a new admin
router.patch(
    '/registerAdmin',
    isAuth,
    body('adminId').isString(),
    body('groupId').isString(),
    controller.registerAdmin
);

//remove a group admin
router.patch(
    '/removeAdmin',
    isAuth,
    body('adminId').isString(),
    body('groupId').isString(),
    controller.removeAdmin
);

//see all groups that a user is part of
router.get('/userGroups',isAuth,controller.getUserGroups);

//delete a group
router.delete(
    '/delete',
    isAuth,
    body('groupId').isString(),
    controller.deleteGroup
);

module.exports = router;