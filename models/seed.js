const mongoose = require('./connection')
const Issue = require('./issue')

const db = mongoose.connection

db.on("open", () => {
    const seedIssues = [
        { title: 'Social Issues' }
    ]


    Issue.deleteMany({}).then((data) => {
        // Seed Starter Fruits
        Issue.create(seedIssues).then((data) => {
            // send created fruits as response to confirm creation
            console.log(data);
        });
    })

})