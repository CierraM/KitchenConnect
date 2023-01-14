const express = require('express');
const router = express.Router()
const controller = require('../../controllers/v1/cookbookController');

//create a cookbook
router.post('/create', controller.createCookbook)

//add a new recipe to a cookbook

//remove a recipe from a cookbook

//update a cookbook's name

//delete a cookbook - remove from where the user can see it, but does not actually remove it from existance

//share cookbook with a user

//unshare a cookbook from a user

//share cookbook with a group

//unlink a cookbook from a group

module.exports = router;