const mongoose = require('mongoose');
const express = require('express')

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

