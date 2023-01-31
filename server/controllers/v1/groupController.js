const express = require('express');
const mongoose = require('mongoose');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');

//create a group
exports.createGroup = (req, res, next) => {
    const userId = req.userId;
    const groupName = req.body.groupName;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    Group.create({
        name: groupName,
        members: [userId],
        admins: [userId],
        owner: userId
    }).then(group => {
        if (!group) {
            return res.status(500).json({
                message: "unable to create group"
            })
        }
        return res.status(201).json({
            message: "group created successfully",
            name: group.name
        })
    })
}

exports.addMembers = (req, res, next) => {
    const userId = req.userId;
    const memberIds = req.body.memberIds;
    const groupId = req.body.groupId;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    //make sure this user has permission to add members
    Group.findById(groupId).then(group => {
        if (!group) {
            return res.status(404).json({
                message: "group not found"
            })
        }
        if (!group.admins.includes(userId)) {
            return res.status(401).json({
                message: "you do not have permission to add members to this group"
            })
        }

        let results = [];
        memberIds.forEach(async member => {
            if (group.members.includes(member)) {
                results.push({ message: `member with id ${member} not added because they already belong to this group.` })
            }
            else {
                results.push({ message: `member with id ${member} successfully added to the group.` })
                await group.update({ '$push': { members: member } })
            }
        })
        res.status(201).json({
            results: results
        })
    })
}

exports.removeMember = async (req, res, next) => {
    const userId = req.userId;
    const memberId = req.body.memberId;
    const groupId = req.body.groupId;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    //make sure this user has permission to add members
    await Group.findById(groupId).then(async group => {
        if (!group) {
            return res.status(404).json({
                message: "group not found"
            })
        }
        if (!group.admins.includes(userId)) {
            return res.status(401).json({
                message: "you do not have permission to remove members from this group"
            })
        }

        if (!group.members.includes(memberId)) {
            return res.status(200).json({ message: `Member not part of this group. Unable to remove.` })
        }
        else {
            await group.update({ '$pull': { members: memberId } })
            return res.status(200).json({ message: `member successfully removed from the group` })
        }

    })
}

exports.getGroupRecipes = (req, res, next) => {
    const userId = req.userId;
    const groupId = req.params.id;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    Group.findById(groupId).then(group => {
        if (!group) {
            return res.status(404).json({
                message: "group not found"
            })
        }
        if (!group.members.includes(userId)) {
            return res.status(401).json({
                message: "You are not part of this group."
            })
        }

        Recipe.find()
            .populate()
            .then(recipes => {

                const groupRecipes = recipes.filter(r => r.groupPermissions.readonly.includes(groupId))
                    .map(r => {
                        return {
                            _id: r._id,
                            title: r.title,
                            description: r.description,
                            tags: r.tags,
                            ingredients: r.ingredients,
                            steps: r.steps.map(step => {
                                return {
                                    ordinal: step.ordinal,
                                    text: step.text
                                }
                            }),
                            related: r.related,
                            private: r.private,
                            accessLevel: r.userPermissions.owner == userId ? "owner" : "readonly",
                        }
                    })
                Cookbook.find()
                    .populate()
                    .then(cookbooks => {
                        const groupCookbooks = cookbooks
                            .filter(c => c.groupPermissions.readAccess.includes(groupId))
                            .map(c => {
                                return {
                                    _id: c._id,
                                    title: c.title,
                                    recipes: c.recipes
                                }
                            })
                        return res.status(200).json({
                            recipes: groupRecipes,
                            cookbooks: groupCookbooks
                        })
                    })
            })
    })

}

exports.registerAdmin = async (req, res, next) => {
    // to register an admin, you need to be an admin of the group already.
    const userId = req.userId;
    const adminId = req.body.adminId;
    const groupId = req.body.groupId;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    //make sure this user has permission to add another admin
    Group.findById(groupId).then(async group => {
        if (!group) {
            return res.status(404).json({
                message: "group not found"
            })
        }
        if (!group.admins.includes(userId)) {
            return res.status(401).json({
                message: "you do not have permission to add admins to this group"
            })
        }

        if (group.admins.includes(adminId)) {
            return res.status(201).json({ message: `member with id ${adminId} not added because they are already an admin for this group.` })
        }
        else {
            await group.update({ '$push': { admins: adminId } })
            return res.status(201).json({ message: `member with id ${adminId} successfully registered as admin.` })
        }

    })
}

exports.removeAdmin = async (req, res, next) => {
    const userId = req.userId;
    const adminId = req.body.adminId;
    const groupId = req.body.groupId;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    //make sure this user has permission to remove members
    await Group.findById(groupId).then(async group => {
        if (!group) {
            return res.status(404).json({
                message: "group not found"
            })
        }
        //only a group owner can remove admins
        if (!group.owner == userId) {
            return res.status(401).json({
                message: "you do not have permission to remove admins from this group. Only the group owner can remove admins."
            })
        }

        if (!group.admins.includes(adminId)) {
            return res.status(200).json({ message: `Member not an admin of this group. Unable to remove.` })
        }
        else {
            group.update({ '$pull': { admins: adminId } }).then(result => {
                return res.status(200).json({ message: `admin status successfully revoked` })
            })

        }

    })
}

exports.getUserGroups = (req, res, next) => {
    let userId = req.query.userId;
    if (!userId) {
        userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                message: "You are not allowed to access this resource."
            })
        }
    }

    Group.find({ members: userId }).then(groups => {
        return res.status(200).json({
            groups: groups.map(group => {
                return {
                    _id: group._id,
                    name: group.name,
                    members: group.members,
                    admins: group.admins
                }
            })
        })
    })
}

exports.deleteGroup = (req, res, next) => {
    const userId = req.userId;
    const groupId = req.body.groupId;

    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    //make sure this user has permission to remove members
    Group.findById(groupId).then(group => {
        if (!group) {
            return res.status(404).json({
                message: "Group not found"
            })
        }
        //only a group owner can remove admins
        if (!group.owner == userId) {
            return res.status(401).json({
                message: "You do not have permission to remove admins from this group. Only the group owner can remove admins."
            })
        }

        Group.deleteOne({ _id: groupId }).then(result => {
            res.status(200).json({
                message: "Group deleted."
            })
        })
    })
}