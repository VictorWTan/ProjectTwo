const mongoose = require('./connection')
const Issue = require('./issue')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c');

const db = mongoose.connection

const addBabyFormula = () => {
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'baby formula',
        language: 'en',
    })
    .then(res => {
    let babyFormulaArticles = res.articles
    let taggedFormulaArticles = babyFormulaArticles.map((article) => {
        article.issues = 'Children and Family'
    })
    Issue.deleteMany({}).then((data) => {
        // Seed Starter Fruits
        Issue.create(taggedFormulaArticles).then((data) => {
                console.log(data)
            })
        })
    })
}



const addClimate = () => {
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'climate change',
        language: 'en',
    })
    .then((res) => {
        let climateChangeArticles = res.articles
        let taggedClimateArticles = climateChangeArticles.map((article) => {
            article.issue = 'Climate Change'
        })
        Issue.insertMany(taggedClimateArticles).then((data) => {
            console.log(data)
        })
    })
}




db.on("open", () => {
    addBabyFormula()
    addClimate()
})


