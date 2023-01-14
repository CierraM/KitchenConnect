const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');
const Group = require('../../models/groupSchema');

//signup new user
exports.signup = async (req, res, next) => {
    console.log('signing up')
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const firstName = req.body.firstName || '';
    const lastName = req.body.lastName || '';
    const avatar = req.body.avatar || '';

    User.findOne({
        $or: [{ username }, { email }]
    }).then((user) => {
        if (user) {
            return res.status(409).json({
                message: "This user already exists."
            })
        }

        bcrypt.hash(password, 2, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ message: "An error ocurred. Please try again later." })
            }
            User.create({
                username,
                hashedPassword,
                email,
                firstName,
                lastName,
                avatar
            }).then((user, error) => {
                console.log(user)
                if (error) {
                    return res.status(400).json({
                        message: "Unable to create user"
                    })
                }

                return res.status(200).json({
                    message: "User successfully signed up",
                    user: {
                        _id: user._id.toString,
                        username: user.username,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName
                    }
                })
            })

        })
    })

}

//login
exports.login = async (req, res, next) => {
    console.log('attempting login')
    const email = req.body.email;
    const password = req.body.password;

    let loadedUser

    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Username or password incorrect"
                })
            }
            loadedUser = user;
            return bcrypt.compare(password, user.hashedPassword);
        })
        .then(matched => {
            if (!matched) {
                return res.status(401).json({
                    message: "Username or password incorrect"
                })
            }
            const token = jwt.sign({
                email,
                userId: loadedUser._id.toString()
            }, process.env.SECRET_KEY)
            res.cookie('jwt', token).send('User authenticated')
        })

}

//fetch all recipes and cookbooks that belong to a user
exports.getMyRecipes = (req, res, next) => {
    console.log('getting user recipes')
    // const userId = req.body.userId;
    const userId = "63c0b7f789b7c27224f5ae2d" //testing only
    if (!userId) {
        return res.status(401).json({
            message: "You must be logged in to view user recipes"
        })
    }

    //get recipes
    Recipe.find()
        .populate()
        .then(recipes => {

            User.findById(userId)
                .then(user => {
                    const hiddenRecipes = user.hidden.recipes;
                    const hiddenCookbooks = user.hidden.cookbooks;
                    const favorites = user.favoriteRecipes;

                    const userRecipes = recipes
                        .filter(r => r.userPermissions.owner == userId ||
                            r.userPermissions.readonly.includes(userId))
                        .filter(r => !(hiddenRecipes.includes(r.id)))
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
                                isFavorite: favorites.includes(r)
                            }
                        })
                    Cookbook.find()
                        .populate()
                        .then(cookbooks => {
                            const userCookbooks = cookbooks
                                .filter(c => c.userPermissions.readAccess.includes(userId) || c.userPermissions.owner == userId)
                                .filter(c => !(hiddenCookbooks.includes(c.id)))
                                .map(c => {
                                    return {
                                        _id: c._id,
                                        title: c.title,
                                        recipes: c.recipes
                                    }
                                })
                            return res.status(200).json({
                                recipes: userRecipes,
                                cookbooks: userCookbooks
                            })
                        })
                })
        })


}

//fetch all favorite recipes for a user
exports.getUserFavorites = (req, res, next) => {
    console.log('attempting to retrieve user favorites')
    // const userId = req.body.userId;
    const userId = "63c0b7f789b7c27224f5ae2d" //testing only

    User.findById(userId)
        .populate("favoriteRecipes")
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: "user does not exist"
                })
            }
            return res.status(200).json({
                favorites: user.favoriteRecipes
            })
        })
}

//update user info
exports.updateUserInfo = (req, res, next) => {

}