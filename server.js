require('dotenv').config()
const express = require('express')
const app = require('liquid-express-views')(express())
const methodOverride = require('method-override')
const MongoStore = require('connect-mongo')
const IssueRouter = require('./controllers/issue')
const UserRouter = require('./controllers/user')
const session = require('express-session')
const Issue = require('./models/issue')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(methodOverride("_method"))
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    saveUninitialized: true,
    resave: false,
  })
)

app.use('/issues', IssueRouter)
app.use('/user', UserRouter)

app.get('/', (req, res) => {
  Issue.find({}).then((data) => {
    res.render('index')
  })
  .catch((error) => {
    console.log(error)
    res.json({error})
  })
  
})


const PORT = process.env.PORT || 4000
app.listen(PORT, () => console.log(`Now Listening on port: ${PORT}`))