const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

exports.objectIdOfArray = (arr) => {
    if (!arr) {
        return [];
    }
    return arr.map(i => {
        return mongoose.Types.ObjectId(i);
    })
}

//check if a user has permission to view a recipe. Return true or false
exports.permissionToViewRecipe = (recipe, userId) => {
    if (!recipe) {
        return true;
    }

    if (!recipe.private) {
        return true;
    }

    const isOwner = recipe.userPermissions.owner == userId;
    const isViewer = recipe.userPermissions.readonly.includes(userId);

    if (isOwner || isViewer) {
        return true;
    }

    return false;
}

exports.hasPermissionToShareCookbook = (cookbook, userId) => {
    if (cookbook.userPermissions.owner == userId) {
        return true;
    }
    if (cookbook.userPermissions.writeAccess.includes(userId)) {
        return true;
    }
    if (cookbook.userPermissions.readAccess.includes(userId)) {
        return true;
    }
    return false;
    
}

//returns array that includes readaccess, writeaccess, and owner
exports.getAllCookbookPermissions = cookbook => {
    const readAccess = cookbook.userPermissions.readAccess;
    const writeAccess = cookbook.userPermissions.writeAccess;
    const owner = cookbook.owner
    

    const permissions = readAccess.concat(writeAccess);
    permissions.push(owner);

    //filter the array to return only unique values
    return permissions.filter((v, q, self) => {
        return i == self.indexOf(v)
    })
}

exports.checkForErrors = (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "one or more errors ocurred",
            errors: errors
        })
    }
}