const express = require('express')
const Issue = require('../models/issue')
const router = express.Router()


router.use((req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect("user/login")
    }
})

// GET Index page

router.get('/', (req, res) => {
    // Find all issues
    Issue.find({})
    // Render index page when they're found
    .then((issue) => {
        res.render('issues/index.liquid', {issue})
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Show page for each issue/article

router.get('/:id', (req, res) => {
    // Set the parameters equal to a variable
    const id = req.params.id

    Issue.findById(id)
    .then((issue) => {
        res.render('issues/show.liquid', {issue})
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
    
})

module.exports = router