const express = require('express')
const Issue = require('../models/issue')
const router = express.Router()

router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect("/user/login")
    }
})

// GET Index page

// Show page for each issue/article

// Post article into issues index

// GET new article page

// Edit page for those with admin privleges. Otherwise show 403 error

// Update takes info and updates it to issues show page

// Delete route to delete article 
