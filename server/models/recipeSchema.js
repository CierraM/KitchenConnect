const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: String,
    tags: [String],
    ingredients: [String],
    steps: [{
        ordinal: Number,
        text: String
    }],
    notes: [String],
    related: {
        type: [mongoose.ObjectId],
        ref: 'Recipe'
    },
    private: {
        type: Boolean,
        default: false
    },
    userPermissions: {
        readonly: {
            type: [mongoose.ObjectId],
            ref: 'User'
        },
        owner: {
            type: mongoose.ObjectId,
            ref: 'User'
        }
    },
    groupPermissions: {
        //groups that can view the recipe. Only the owner can edit it, hence, only a readonly field exists for groups
        readonly: {
            type: [mongoose.ObjectId],
            ref: 'Group'
        }
    }
})

module.exports = mongoose.model('Recipe', recipeSchema)