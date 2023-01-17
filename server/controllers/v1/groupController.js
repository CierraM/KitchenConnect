const express = require('express');
const mongoose = require('mongoose');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');

//create a group
exports.createGroup = (req, res, next) => {
    //TODO: make sure this comes from auth middleware, not request
    const userId = req.body.userId;
    const groupName = req.body.groupName;

    Group.create({
        name: groupName,
        members: [userId],
        admins: [userId]
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
    //TODO: make sure this comes from auth middleware
    const userId = req.body.userId;
    const memberIds = req.body.memberIds;
    const groupId = req.body.groupId;

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
                results.push({message: `member with id ${member} not added because they already belong to this group.`})
            }
            else {
                results.push({message: `member with id ${member} successfully added to the group.`})
                await group.update({ '$push': { members: member } })
            }
        })
        res.status(201).json({
            results: results
        })
    })
}

exports.removeMember = async (req, res, next) => {
    //TODO: make sure this comes from auth middleware
    const userId = req.body.userId;
    const memberId = req.body.memberId;
    const groupId = req.body.groupId;

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
    //TODO: get userid from token
    const userId = '63c0b7f789b7c27224f5ae2d';
    const groupId = req.params.id;

    Group.findById(groupId).then(group => {
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
