const mongoose = require('./connection')
const Issue =  require('./issue')

const db = mongoose.connection

db.on("open", () => {
    const seedIssues = [
    
    ]
})