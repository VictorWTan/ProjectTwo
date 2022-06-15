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
    Issue.distinct('issue').then((data) => {
        res.render('issues/index.liquid', {data})
    })
})

router.get('/:issue', (req, res) => {
    Issue.find({'issue': `${req.params.issue}`}).then((data) => {
        res.render('issues/show.liquid', {data})
    })
})

module.exports = router

