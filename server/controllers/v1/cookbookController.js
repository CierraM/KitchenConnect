const express = require('express');
const mongoose = require('mongoose');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');
const {
    objectIdOfArray,
    getAllCookbookPermissions
} = require('../../helpers/helpers');

exports.createCookbook = (req, res, next) => {
    console.log('Attempting create cookbook')
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You must be logged in to create a recipe."
        })
    }

    const cookbook = {
        title: req.body.title,
        recipes: objectIdOfArray(req.body.recipes),
        userPermissions: {
            readAccess: objectIdOfArray(req.body.userPermissions?.readAccess),
            writeAccess: objectIdOfArray(req.body.userPermissions?.writeAccess),
            owner: mongoose.Types.ObjectId(userId)
        },
        groupPermissions: {
            readAccess: objectIdOfArray(req.body.groupPermissions?.readAccess),
            writeAccess: objectIdOfArray(req.body.groupPermissions?.writeAccess)
        }

    }

    Cookbook.create(cookbook).then(cookbook => {
        res.status(201).json({
            message: "cookbook created",
            _id: cookbook._id,
            cookbook: cookbook
        })
    })
}

exports.addRecipe = (req, res, next) => {

    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const cookbookId = req.body.cookbookId;
    const recipeId = req.body.recipeId;


    //TODO: let a user edit a cookbook if they are part of a group with permissions as well
    Cookbook.findById(cookbookId).then(cookbook => {
        if (!(cookbook.userPermissions.owner == userId || cookbook.userPermissions.writeAccess.includes(userId))) {
            return res.status(401).json({
                message: "you do not have permissions to edit this cookbook"
            })
        }

        if (cookbook.recipes.includes(recipeId)) {
            return res.status(200).json({
                message: "Recipe already included in cookbook"
            })
        }

        cookbook.update({ '$push': { recipes: recipeId } }).then(result => {
            return res.status(201).json({
                message: "recipe added successfully."
            })
        })
    })
}

exports.removeRecipe = (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const cookbookId = req.body.cookbookId;
    const recipeId = req.body.recipeId;

    Cookbook.findById(cookbookId).then(cookbook => {
        if (!(cookbook.userPermissions.owner == userId || cookbook.userPermissions.writeAccess.includes(userId))) {
            return res.status(401).json({
                message: "you do not have permissions to edit this cookbook"
            })
        }

        if (!cookbook.recipes.includes(recipeId)) {
            return res.status(200).json({
                message: "Recipe not included in cookbook. Nothing to remove."
            })
        }

        cookbook.update({ '$pull': { recipes: recipeId } }).then(result => {
            return res.status(201).json({
                message: "recipe removed successfully."
            })
        })
    })
}

exports.shareWithUser = (req, res, next) => {
    //This one is a little different.
    //To share a cookbook, you can specify read or write access
    //anyone with read access can share the cookbook for someone else to read it
    //but you need to have write access to grant someone else write access

    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    const cookbookId = req.body.cookbookId;
    const recipientUserId = req.body.recipientUserId;
    let permissionLevel = req.body.permissionLevel.toLowerCase().trim() == 'write' ? 'write' : 'read';

    if (!cookbookId || !recipientUserId || !req.body.permissionLevel) {
        return res.status(400).json({
            message: "improperly formatted request"
        })
    }

    Cookbook.findById(cookbookId).then(cookbook => {
        if (!cookbook.userPermissions.writeAccess.includes(userId) && cookbook.userPermissions.owner != userId) {
            console.log('no write access')
            if (!cookbook.userPermissions.readAccess.includes(userId)) {
                console.log('no read access either')
                return res.status(401).json({
                    message: "you do not have permission to share this cookbook"
                })
            } else {
                permissionLevel = 'read';
            }
        }

        if (permissionLevel == 'read') {
            if (cookbook.userPermissions?.readAccess.includes(recipientUserId)) {
                return res.status(200).json({
                    message: 'user has already been granted read permission'
                })
            }
            cookbook.userPermissions.readAccess.push(recipientUserId);
            cookbook.save()
                .then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "unable to save results"
                        })
                    }
                    return res.status(200).json({
                        message: "read permission granted for this cookbook"
                    })
                })
        }
        if (permissionLevel == 'write') {
            if (cookbook.userPermissions?.writeAccess.includes(recipientUserId)) {
                return res.status(200).json({
                    message: 'user has already been granted write permission'
                })
            }
            cookbook.userPermissions.writeAccess.push(recipientUserId);
            cookbook.save()
                .then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "unable to save results"
                        })
                    }
                    return res.status(200).json({
                        message: "write permission granted for this cookbook"
                    })
                })
        }

    })

}

exports.shareWithGroup = (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    const cookbookId = req.body.cookbookId;
    const recipientGroupId = req.body.recipientGroupId;
    let permissionLevel = req.body.permissionLevel.toLowerCase().trim() == 'write' ? 'write' : 'read';

    if (!cookbookId || !recipientGroupId || !req.body.permissionLevel) {
        return res.status(400).json({
            message: "improperly formatted request"
        })
    }

    Cookbook.findById(cookbookId).then(cookbook => {
        if (!cookbook.userPermissions.writeAccess.includes(userId) && cookbook.userPermissions.owner != userId) {
            if (!cookbook.userPermissions.readAccess.includes(userId)) {
                return res.status(401).json({
                    message: "you do not have permission to share this cookbook"
                })
            } else {
                permissionLevel = 'read';
            }
        }

        if (permissionLevel == 'read') {
            if (cookbook.groupPermissions?.readAccess.includes(recipientGroupId)) {
                return res.status(200).json({
                    message: 'group has already been granted read permission'
                })
            }
            cookbook.groupPermissions.readAccess.push(recipientGroupId)
            cookbook.save()
                .then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "unable to save recipe"
                        })
                    }
                    return res.status(200).json({
                        message: "read permission granted for this cookbook"
                    })
                })
        }
        if (permissionLevel == 'write') {
            if (cookbook.groupPermissions?.writeAccess.includes(recipientGroupId)) {
                return res.status(200).json({
                    message: 'group has already been granted write permission'
                })
            }
            cookbook.groupPermissions.writeAccess.push(recipientGroupId);
            cookbook.save()
                .then(result => {
                    if (!result) {
                        return res.status(500).json({
                            message: "unable to save recipe"
                        })
                    }
                    return res.status(200).json({
                        message: "write permission granted for this cookbook"
                    })
                })
        }

    })
}

exports.updateCookbook = (req, res, next) => {
    //TODO: test this
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const cookbookId = req.body.cookbookId;
    const update = req.body.changes;
    console.log(update)

    Cookbook.findById(cookbookId).then(cookbook => {
        if (cookbook.userPermissions.owner != userId) {
            return res.status(401).json({
                message: "You do not have permission to update this cookbook"
            })
        }
        cookbook.update(update).then(updatedCookbook => {
            return res.status(200).json({
                message: "update successful",
                update: updatedCookbook
            })
        })

    })
}

exports.unlinkCookbookFromGroup = (req, res, next) => {
    //the recipe can be removed by group admins or cookbook owner

    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const groupId = req.body.groupId;
    const cookbookId = req.body.cookbookId;

    Group.findById(groupId).then(group => {
        Cookbook.findById(cookbookId).then(cookbook => {
            if (cookbook.userPermissions.owner != userId && !group.admins.includes(userId)) {
                return res.status(401).json({
                    message: "you do not have permission to remove this recipe"
                })
            }
            cookbook.update({
                groupPermissions: {
                    '$pull': { readAccess: groupId },
                    '$pull': { writeAccess: groupId }
                },
            }).then(result => {
                return res.status(200).json({
                    message: 'removed group access to recipe',
                    result: result
                })
            })
        })
    })

}

exports.unlinkCookbookFromUser = (req, res, next) => {
    //TODO: test this
    //so far this only lets a user remove the recipe from their own account
    //maybe someday there will be a need to allow other users to remove a recipe from someone

    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const cookbookId = req.body.cookbookId

    Cookbook.findById(cookbookId).then(cookbook => {
        cookbook.update({
            userPermissions: {
                '$pull': { readAccess: userId },
                '$pull': { writeAccess: groupId }
            }
        }).then(result => {
            return res.status(200).json({
                message: 'user removed from cookbook'
            })
        })
    })
}

exports.deleteCookbook = (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const cookbookId = req.body.cookbookId;

    Cookbook.findById(cookbookId).then(cookbook => {
        if (!cookbook.userPermissions.owner == userId) {
            return res.status(401).json({
                message: "you do not have permission to delete this cookbook"
            })
        }
        cookbook.delete().then(result => {
            return res.status(200).json({
                message: "cookbook deleted"
            })
        });
    })
}