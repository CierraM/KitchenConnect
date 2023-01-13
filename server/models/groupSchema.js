const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    members: {
        type: [mongoose.ObjectId],
        ref: 'User'
    },
    //the admin should also be a member
    admins: {
        type: [mongoose.ObjectId],
        ref: 'User'
    }
})

module.exports = mongoose.model('Group', groupSchema)