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
                cookbookIds.foreach(cb => {
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


