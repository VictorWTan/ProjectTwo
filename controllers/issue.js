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

router.get('/', (req, res) => {
    // Find all issues
    Issue.find({})
    // Render index page when they're found
    .then((issue) => {
        console.log(issue)
        res.render('issues/index.liquid', {issues})
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

// Post article into issues index

router.post('/', (req, res) => {
    req.body.username = req.session.username
    Issue.create(req.body)
    .then((issues) => {
        res.redirect('/issues')
    })
})

// GET new article page for those with admin privileges

router.get('/new', (req, res) => {
    res.render('issues/new.liquid')
})

// Edit page for those with admin privleges. Otherwise show 403 error

router.get('/:id/edit', (req, res) => {
    const id = req.params.id

    Issue.find(id)
    .then((issue) => {
        res.render('issues/edit.liquid', {issue})
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Update takes info and updates it to issues show page

router.put('/:id', (req, res) => {
    const id = req.params.id

    Issue.findByIdAndUpdate(id, req.body, {new: true})
    .then((issue) => {
        res.redirect('/issues')
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})

// Delete route to delete article 

router.delete('/:id', (req, res) => {
    const id = req.params.id

    Issue.findByIdAndRemove(id)
    .then((issue) => {
        res.redirect('/issues')
    })
    .catch((error) => {
        console.log(error)
        res.json({error})
    })
})