// Require dependencies
const User = require('../models/user')
const Issue = require('../models/issue')
const express = require('express')
const router = Express.router()
const Comment =  require('../models/comment')


// Post route to post to the current page
router.post('/:issue', (req, res) => {
    let issue = req.params.issue
    
    let username = req.session.username
    let newComment = {
        commentIssue: issue,
        username: username,
        body: req.body.comments
    }
    Comment.create(newComment).then((comment) => {
        User.findOne({username: username}).then((user) => {
            comment.save()
            console.log(comment)
        })
        Issue.updateMany({'issue': `${req.params.issue}`}, {$push: {comments: comment}}).then((data) => {
            console.log(data)
        })
        User.findOneAndUpdate({username: username}, {$push: {comments: comment}}).then((user) => {
            console.log(user)
        })
        res.redirect('issues/:issue')
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Update route 


// Delete route for comments