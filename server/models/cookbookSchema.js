const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cookbookSchema = new Schema({
    title: {
        type: String,
        default: 'Untitled'
    },
    recipes: {
        type: [mongoose.ObjectId],
        ref: 'Recipe'
    },
    userPermissions: {
        //users that can read the cookbook
        readAccess: {
            type: [mongoose.ObjectId],
            ref: 'User'
        },
        //users that can add new recipes to it
        writeAccess: {
            type: [mongoose.ObjectId],
            ref: 'User'
        },
        //owner can grant read or write access to users and groups
        owner: {
            type: [mongoose.ObjectId],
            ref: 'User'
        }
    },
    groupPermissions: {
        //groups that can read
        readAccess: {
            type: [mongoose.ObjectId],
            ref: 'Group'
        },
        //groups that can add new recipes
        writeAccess: {
            type: [mongoose.ObjectId],
            ref: 'Group'
        }
    }
})

module.exports = mongoose.model('Cookbook', cookbookSchema)