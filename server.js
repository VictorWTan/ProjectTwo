require('dotenv').config()
const express = require('express')
const app = require('liquid-express-views')(express())
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const IssueRouter = require('./controllers/issue')
const UserRouter = require('./controllers/user')
const session = require('express-session')
const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c')

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
    saveUninitialized: true,
    resave: false,
  })
)

app.use('/issues', IssueRouter)
app.use('/user', UserRouter)

app.get('/', (req, res) => {
  res.render('index')
})


const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Now Listening on port: ${PORT}`))