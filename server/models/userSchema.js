const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Recipe = require('./recipeSchema')
const Cookbook = require('./cookbookSchema')

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: String,
    firstName: String,
    lastName: String,
    avatar: String,
    favoriteRecipes: {
        type: [mongoose.ObjectId],
        ref: Recipe
    },
    //these fields are for if a user 'deletes' something from their dashboard.
    hidden: {
        recipes: {
            type: [mongoose.ObjectId],
            ref: Recipe 
        },
        cookbooks: {
            type: [mongoose.ObjectId],
            ref: Cookbook
        }
    }
    
})

module.exports = mongoose.model('User', userSchema)