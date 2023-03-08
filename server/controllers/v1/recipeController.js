const mongoose = require('mongoose');
const isAuth = require('../../auth/auth')
const { validationResult } = require('express-validator');

const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');
const {
    objectIdOfArray,
    permissionToViewRecipe,
} = require('../../helpers/helpers');

exports.createRecipe = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "one or more errors ocurred",
            errors: errors
        })
    }
    const userId = req.userId;
    console.log('Attempting create recipe')
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
                _id: recipe._id
            })
        }).catch(err => {
            console.log(err)
        return res.status(400).json({message: "there was a problem"})
    })
}

exports.getRecipeById = (req, res, next) => {
    const recipeId = req.params.id;

    Recipe.findById(recipeId)
        .populate('related')
        .then(recipe => {
            if (!recipe) {
                return res.status(404).json({
                    message: "Recipe not found"
                })
            }

            if (recipe.private) {
                //check for JWT and get userId
                isAuth(req, res, () => {
                    if (!permissionToViewRecipe(recipe, userId)) {
                        return res.status(401).json({
                            message: "you do not have permission to view this recipe"
                        })
                    }
                    return;
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
                    related: recipe.related.map(r => {
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
                            })
                        }
                    }),
                    private: recipe.private
                }
            })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({message: "unable to fetch recipe"})
    })
}

exports.shareRecipeWithUser = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "one or more errors ocurred",
            errors: errors
        })
    }
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }

    const recipeId = req.body.recipeId;
    const recipientUser = req.body.recipientId;

    Recipe.findById(recipeId).then(recipe => {
        if (!permissionToViewRecipe(recipe, userId)) {
            return res.status(401).json({
                message: "You do not have permission to share this recipe. Contact the recipe owner for permission"
            })
        }

        if (recipe.userPermissions.readonly.includes(recipientUser)) {
            return res.status(200).json({
                message: "user already shared with. No action taken."
            })
        }

        recipe.userPermissions.readonly.push(recipientUser);
        recipe.save()
            .then(result => {
                if (!result) {
                    return res.status(500).json({
                        message: "unable to save recipe"
                    })
                }
                res.status(201).json({
                    message: `Recipe shared.`
                })
            })

    })

}

exports.shareRecipeWithGroup = (req, res, next) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "one or more errors ocurred",
            errors: errors
        })
    }
    const userId = req.userId;

    const recipeId = req.body.recipeId;
    const recipientGroup = req.body.recipientId;

    if (!recipeId || !recipientGroup) {
        return res.status(400).json({
            messsage: "request is missing information"
        })
    }

    Recipe.findById(recipeId).then(recipe => {
        if (!recipe) {
            return res.status(404).json({
                message: "recipe not found"
            })
        }
        if (!permissionToViewRecipe(recipe, userId)) {
            return res.status(401).json({
                message: "You do not have permission to share this recipe. Contact the recipe owner for permission"
            })
        }

        if (recipe.groupPermissions.readonly.includes(recipientGroup)) {
            return res.status(200).json({
                message: "group already shared with. No action taken."
            })
        }
        recipe.groupPermissions.readonly.push(recipientGroup)
        recipe.save()
            .then(result => {
                if (!result) {
                    return res.status(500).json({
                        message: "unable to save recipe"
                    })
                }
                res.status(201).json({
                    message: `Recipe shared`,
                })
            }).catch(err => {
                console.log(err)
                return res.status(400).json({
                    message: "unable to save recipe"
                })
            })

    })
}


exports.deleteRecipe = (req, res, next) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
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
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            message: "unable to delete recipe"
        })
    })
}

exports.removeFromUser = (req, res, next) => {
    //so far this only lets a user remove the recipe from their own account
    //maybe someday there will be a need to allow other users to remove a recipe from someone
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "one or more errors ocurred",
            errors: errors
        })
    }
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
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

    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const groupId = req.body.groupId;
    const recipeId = req.body.recipeId;

    Group.findById(groupId).then(group => {
        Recipe.findById(recipeId).then(recipe => {
            if (recipe.userPermissions.owner != userId && !group.admins.includes(userId)) {
                return res.status(401).json({
                    message: "you do not have permission to remove this recipe"
                })
            }
            recipe.update({ groupPermissions: { '$pull': { readonly: groupId } } }).then(result => {
                return res.status(200).json({
                    message: 'removed group access to recipe',
                    result: result
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
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).send({
            message: "one or more errors ocurred",
            errors: errors
        })
    }
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({
            message: "You are not allowed to access this resource."
        })
    }
    const recipeId = req.body.recipeId;
    const update = req.body.changes;

    Recipe.findById(recipeId).then(recipe => {
        if (recipe.userPermissions.owner != userId) {
            return res.status(401).json({
                message: "You do not have permission to update this recipe"
            })
        }
        recipe.updateOne(update).then(updatedRecipe => {
            return res.status(200).json({
                message: "update successful",
            })
        })

    })
}
