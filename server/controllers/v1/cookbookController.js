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