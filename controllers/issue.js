const express = require('express')
const Issue = require('../models/issue')
const router = express.Router()
const Comment = require('../models/comment')
const User = require('../models/user')


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
        console.log(data)
        res.render('issues/index.liquid', {data})
    })
})

// Show page
router.get('/:issue', (req, res) => {
    Issue.find({'issue': `${req.params.issue}`}).then((data) => {
        res.render('issues/show.liquid', {data})
    })
})

// Post

// Post route to post to the current page
router.post('/:issue', (req, res) => {
    let issue = req.params.issue
    
    let username = req.session.username
    let newComment = {
        commentIssue: issue,
        username: username,
        body: req.body.comment
    }
    console.log(req.params.issue)
    Comment.create(newComment).then((comment) => {
        User.findOne({username: username}).then((user) => {
            comment.save()
            console.log(comment)
            User.findOneAndUpdate({username: username}, {$push: {comments: comment}}).then((user) => {
                console.log(user)
            })
            Issue.updateMany({'issue': `${req.params.issue}`}, {$push: {comments: comment}}).then((data) => {
                console.log(data)
            })
        })
        res.redirect(`/issues/${issue}`)
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})


// Put

// Edit

// Delete

module.exports = router

