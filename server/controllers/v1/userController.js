const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/userSchema');
const Cookbook = require('../../models/cookbookSchema');
const Recipe = require('../../models/recipeSchema');

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
                        _id: user._id,
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
            res.cookie('jwt', token).json({
                message: 'User authenticated',
                _id: loadedUser._id
            })
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
                    const hiddenRecipes = user.hidden?.recipes;
                    const hiddenCookbooks = user.hidden?.cookbooks;
                    const favorites = user.favoriteRecipes;

                    const userRecipes = recipes
                        .filter(r => r.userPermissions.owner == userId ||
                            r.userPermissions.readonly.includes(userId))
                        .filter(r => !(hiddenRecipes?.includes(r.id)))
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
                                .filter(c => !(hiddenCookbooks?.includes(c.id)))
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
    const userId = "63c59fe2cc99adddd0a4d3d9" //testing only

    User.findById(userId)
        .populate("favoriteRecipes")
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: "user does not exist"
                })
            }
            return res.status(200).json({
                favorites: user.favoriteRecipes.map(r => {
                    return {
                        title: r.title,
                        description: r.description,
                        image: r.image,
                        ingredients: r.ingredients,
                        steps: r.steps,
                        notes: r.notes,
                        related: r.related,
                        private: r.private,
                        owner: r.userPermissions.owner
                    }
                })
            })
        })
}


//search for user by id, name, or username. Return nonidentifiable information
exports.searchForUser = (req, res, next) => {
    console.log('attempting to search for a user')
    const query = req.query.query?.trim().toLowerCase();

    if (!query) {
        return res.status(404).json({
            message: "No search parameters passed in",
            users: []
        })
    }

    const filteredQuery = [];
    if (query.split(' ').length > 1) {
        filteredQuery.push({ firstName: { $regex: query.split(' ')[0], $options: 'i' }, lastName: { $regex: query.split(' ')[1], $options: 'i' } })
    }
    else {
        if (mongoose.isValidObjectId(query)) {
            filteredQuery.push({_id: query})
        }
        filteredQuery.push({ email: query })
        filteredQuery.push({username: query})
    }
    console.log(filteredQuery)

    User.find({
        $or: filteredQuery
    }).then(users => {
        res.status(200).json({
            users: users.map(user => {
                return {
                    username: user.username,
                    avatar: user.avatar,
                    _id: user._id
                }
            })
        })
    })


}

exports.sendConnectionRequest = (req, res, next) => {
    const to = req.body.toUser;

    //TODO: get this id from auth middleware
    const from = req.body.fromUser;

    if (!to || !from || !mongoose.isValidObjectId(to) || !mongoose.isValidObjectId(from)) {
        res.status(400).json({
            message: "invalid input. Request body should have a toUser and a fromUser which are both valid objectIds"
        })
    }

    User.findById(to).then(user => {
        if (user.connections.includes(from)) {
             return res.status(200).json({
                message: "request not sent. User already included in connections"
            })
        }
        if (user.connectionRequests.includes(from)) {
            return res.status(200).json({
                message: "A request has already been sent. Not sending another one."
            })
        }
        User.findOneAndUpdate({ _id: to }, {
            '$push': {connectionRequests: from}
        }).then((user) => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found."
                })
            }
            return res.status(200).json({
                message: 'connection request sent'
            })
        })
    })

}

exports.respondToConnectionRequest = (req, res, next) => {
    //remove connection from connectionRequests, and add the users to each others' connections
    //TODO: get userId from auth middleware instead of request
    const userId = req.body.userId;
    const respondingTo = req.body.respondingTo;
    const accept = req.body.accept;

    if (!userId) {
        return res.status(401).json({
            message: "You must be logged in to respond to a request."
        })
    }

    User.findOneAndUpdate({ _id: userId }, {
        '$pull': { connectionRequests: respondingTo}
    }).then(updatedUser => {
        if (updatedUser.connections.includes(respondingTo)) {
            return res.status(200).json({
                message: "User already connected. No further action taken."
            })
        }
        if (accept) {
            User.findOneAndUpdate(userId, {
                '$push': {connections: respondingTo}
            }).then(user => {
                User.findByIdAndUpdate(respondingTo, {
                    '$push': {connections: userId}
                }).then(user => {
                    return res.status(200).json({
                        message: "connection accepted"
                    })
                })
            })
        } else {
            return res.status(200).json({
                message: "connection successfully declined"
            })
        }
    })

}

// use this route to do things like changing what is hidden, etc.
exports.updateUser = (req, res, next) => {
    //TODO: get this from auth middleware
    const userId = "63c59fe2cc99adddd0a4d3d9"; //testing only
    const changes = req.body.changes;

    delete changes["hashedPassword"]

    if (!userId) {
        return res.status(401).json({
            message: "you must be logged in to update a user"
        }) 
    }

    User.findById(userId).then(user => {
        user.updateOne(changes).then(update => {
            return res.status(200).json({
                message: "user updated successfully",
                update: update
            })
        })
    }) 
}

exports.getUser = (req, res, next) => {
       //TODO: get this from auth middleware
    const userId = "63c59fe2cc99adddd0a4d3d9"; //testing only

    if (!userId) {
        return res.status(401).json({
            message: "you must be logged in to get user data"
        }) 
    }
    
    User.findById(userId).then(user => {
        return res.status(200).json({
            user: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                avatar: user.avatar,
                favoriteRecipes: user.favoriteRecipes,
                hiddenRecipes: user.hiddenRecipes,
                hiddenCookbooks: user.hiddenCookbooks,
                connections: user.connections,
                connectionRequests: user.connectionRequests,
            }
        })
    })
}