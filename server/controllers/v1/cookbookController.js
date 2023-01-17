const express = require('express');
const mongoose = require('mongoose');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');
const {
    objectIdOfArray
} = require('../../helpers/helpers');

exports.createCookbook = (req, res, next) => {
    console.log('Attempting create cookbook')
    //get this from auth middleware
    // const userId = req.body.userId;
    // TODO: remove
    const userId = '63c0b7f789b7c27224f5ae2d'
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

    //TODO: make sure this comes from auth file
    const userId = req.body.userId;
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
        //TODO: make sure this comes from auth file
        const userId = req.body.userId;
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