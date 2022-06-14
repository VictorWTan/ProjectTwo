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
    res.render('issues/index.liquid')
})

// Show page for each issue/article

router.get('/:topic', (req, res) => {
    let topic = req.params.topic
    Issue.find({'issue': `${topic}`}).then((issue) => {
        res.render('issues/show.liquid', {issue})
    })
})

module.exports = router