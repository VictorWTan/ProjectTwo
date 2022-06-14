const mongoose = require('./connection')
const Issue = require('./issue')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c');

const db = mongoose.connection

db.on("open", () => {
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'baby formula',
        language: 'en',
    }).then(res => {
        const babyFormulaArticles = res.articles
        Issue.deleteMany({}).then((data) => {
            // Seed Starter Fruits
            Issue.create(babyFormulaArticles).then((data) => {
                // send created fruits as response to confirm creation
                console.log(data);
            })
        })
    })
})