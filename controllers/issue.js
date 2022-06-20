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

// Edit

router.get('/:issue/edit/:id', (req, res) => {
    let issue = req.params.issue
    let id = req.params.id
    Comment.findById(id).then((comment) => {
        res.render('issues/edit.liquid', {issue, comment, id})
    })
})

// Show page
router.get('/:issue', (req, res) => {
    Issue.find({'issue': `${req.params.issue}`}).then((data) => {
        Comment.find({'issue': `${req.params.issue}`}).then((comment) => {
            res.render('issues/show.liquid', {data, comment})
        })
    })
})

// Put
router.put('/:issue/edit/:id', (req, res) => {
    let issue = req.params.issue
    let id = req.params.id
    Comment.updateOne({_id: id}, {$set: {body: req.body.body}}).then((comment) => {
        res.redirect(`/issues/${issue}`)
    })
})

// Delete

router.delete('/:issue', (req, res) => {
    Comment.deleteOne({_id: req.body.deleteId}).then((comment) => {
        res.redirect(`/issues/${req.params.issue}`)
    })
})


module.exports = router

