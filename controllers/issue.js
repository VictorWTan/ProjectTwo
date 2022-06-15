const express = require('express')
const { find } = require('../models/issue')
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

// Show page for each issue/article

router.get('/:issueId', async (req, res) => {
    const issueId = await Issue.find({'issues': `${req.params.issueId}`})
    
})

module.exports = router

