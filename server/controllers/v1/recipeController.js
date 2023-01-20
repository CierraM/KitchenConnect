const express = require('express');
const mongoose = require('mongoose');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');
const {
    objectIdOfArray,
    permissionToViewRecipe
} = require('../../helpers/helpers');

exports.createRecipe = (req, res, next) => {
    console.log('Attempting create recipe')
    //get this from auth middleware
    const userId = req.body.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You must be logged in to create a recipe."
        })
    }
    const recipe = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        tags: req.body.tags,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        related: objectIdOfArray(req.body.related),
        private: req.body.private || false,
        userPermissions: {
            owner: mongoose.Types.ObjectId(userId),
            readonly: objectIdOfArray(req.body.userPermissions?.readonly),
        },
        groupPermissions: {
            readonly: objectIdOfArray(req.body.groupPermissions?.readonly)
        }
    }
    const cookbookIds = req.body.cookbookIds || [];

    Recipe.create(recipe)
        .then(recipe => {
            if (!recipe) {
                return res.status(500).json({
                    message: "Recipe was not able to be saved."
                })
            }
            //add recipe to each cookbook
            cookbookIds.forEach(cb => {
                Cookbook.findOneAndUpdate({ _id: cb }, {
                    '$push': { recipes: recipe }
                })
            })


            return res.status(200).json({
                message: "Recipe created successfully",
                recipe: recipe
            })
        })
}

exports.getRecipeById = (req, res, next) => {
    const recipeId = req.params.id;
    const userId = req.body.userId;

    Recipe.findById(recipeId)
        .populate()
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({
                    message: "Recipe not found"
                })
            }

            if (!permissionToViewRecipe(recipe, userId)) {
                return res.status(404).json({
                    message: "you do not have permission to view this recipe"
                })
            }

            return res.status(200).json({
                recipe: {
                    _id: recipe._id,
                    title: recipe.title,
                    description: recipe.description,
                    tags: recipe.tags,
                    ingredients: recipe.ingredients,
                    steps: recipe.steps.map(step => {
                        return {
                            ordinal: step.ordinal,
                            text: step.text
                        }
                    }),
                    related: recipe.related,
                    private: recipe.private
                }
            })
        })
}

exports.shareRecipeWithUser = (req, res, next) => {
    //TODO: get user id from auth
    //make sure you have permission to share
    const userId = "63c0b7f789b7c27224f5ae2d";

    const recipeId = req.body.recipeId;
    const recipientGroup = req.body.shareWith.groupId;
    const recipientUser = req.body.shareWith.userId;

    Recipe.findById(recipeId).then(recipe => {
        if (!permissionToViewRecipe(recipe, userId)) {
            return res.status(401).json({
                message: "You do not have permission to share this recipe. Contact the recipe owner for permission"
            })
        }

        if (recipe.userPermissions.readonly.includes(recipientUser) || recipe.groupPermissions.readonly.includes(recipientGroup)) {
            return res.status(200).json({
                message: "user/group already shared with. No action taken."
            })
        }
        //TODO: this still doesn't work when you send a userId to be updated. I don't know why.
        const updateQuery = {
            ...(recipientUser && { userPermissions: { $push: { readonly: recipientUser } } }),
            ...(recipientGroup && { groupPermissions: { $push: { readonly: recipientGroup } } })
        }

        recipe.update({ _id: recipeId }, updateQuery).then(result => {
            res.status(201).json({
                message: `Recipe shared. ${result.modifiedCount} rows updated`
            })
        })

    })

}


exports.deleteRecipe = (req, res, next) => {
    //TODO: get user id from auth
    const userId = "63c0b7f789b7c27224f5ae2d";
    const recipeId = req.params.id;

    Recipe.findById(recipeId).then(recipe => {
        if (!recipe) {
            return res.status(404).json({
                message: "this recipe does not exist"
            })
        }
        if (!(recipe.userPermissions.owner == userId)) {
            return res.status(401).json({
                message: "You are not authorized to delete this recipe"
            })
        }
        recipe.delete().then(result => {
            res.status(200).json({
                message: "recipe successfully deleted"
            })
        })
    })
}

exports.removeFromUser = (req, res, next) => {
    //so far this only lets a user remove the recipe from their own account
    //maybe someday there will be a need to allow other users to remove a recipe from someone

    //TODO: get user id from auth
    const userId = "63c0b7f789b7c27224f5ae2d";
    const recipeId = req.body.recipeId

    Recipe.findById(recipeId).then(recipe => {
        recipe.update({ userPermissions: { '$pull': { readonly: userId } } }).then(result => {
            return res.status(200).json({
                message: 'user removed from recipe'
            })
        })
    })

}

exports.removeFromGroup = (req, res, next) => {
    //this is authorized if the user owns the recipe or is a group admin

    //TODO: get user id from auth
    const userId = "63c0b7f789b7c27224f5ae2d";
    const groupId = req.body.groupId

    Group.findById(groupId).then(group => {
        Recipe.findById(recipeId).then(recipe => {
            if (recipe.userPermissions.owner != userId && !group.admins.includes(userId)) {
                return res.status(401).json({
                    message: "you do not have permission to remove this recipe"
                })
            }
            recipe.update({ groupPermissiosn: { '$pull': { readonly: groupId } } }).then(result => {
                return res.status(200).json({
                    message: 'removed group access to recipe'
                })
            })
        })
    })

}

exports.getAllPublicRecipes = (req, res, next) => {
    Recipe.find({ private: false }).then(recipes => {
        return res.status(200).json({
            recipes: recipes.map(recipe => {
                return {
                    _id: recipe._id,
                    title: recipe.title,
                    description: recipe.description,
                    image: recipe.image,
                    tags: recipe.tags,
                    ingredients: recipe.ingredients,
                    steps: recipe.steps,
                    related: recipe.related,
                    private: false
                }
            })
        })
    })
}

exports.updateRecipe = (req, res, next) => {
    //TODO: get user id from auth
    const userId = "63c0b7f789b7c27224f5ae2d";
    const recipeId = req.body.recipeId;
    const update = req.body.changes;
    console.log(update)

    Recipe.findById(recipeId).then(recipe => {
        if (recipe.userPermissions.owner != userId) {
            return res.status(401).json({
                message: "You do not have permission to update this recipe"
            })
        }
        recipe.update(update).then(updatedRecipe => {
            return res.status(200).json({
                message: "update successful",
                update: updatedRecipe
            })
        })

    })
}