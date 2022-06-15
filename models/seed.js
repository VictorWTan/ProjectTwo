const mongoose = require('./connection')
const Issue = require('./issue')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c');

const db = mongoose.connection

// Create a function that adds the articles
const addBabyFormula = () => {
    // Fetches all articles from a query 
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'baby formula',
        language: 'en',
    })
    // Take the information from the query
    .then(res => {
    // Set a variable for the articles obtained
    let babyFormulaArticles = res.articles
    // Mapping all of the articles to a new array with an issue property added
    let taggedFormulaArticles = babyFormulaArticles.map((article) => {
        article.issue = 'Children and Family'
        return article
    })
    // Prep the database by clearing the data
    Issue.deleteMany({}).then((data) => {
        // Insert the articles
        Issue.insertMany(taggedFormulaArticles).then((data) => {
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
            return article
        })
        Issue.insertMany(taggedClimateArticles).then((data) => {
            console.log(data)
        })
    })
}

const addCovid = () => {
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'coronavirus',
        language: 'en',
    })
    .then((res) => {
        let covidArticles = res.articles
        let taggedCovidArticles = covidArticles.map((article) => {
            article.issue = 'Coronavirus'
            return article
        })
        Issue.insertMany(taggedCovidArticles).then((data) => {
            console.log(data)
        })
    })
}

const addImmigration= () => {
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'immigration',
        language: 'en',
    })
    .then((res) => {
        let immigrationArticles = res.articles
        let taggedImmigrationArticles = immigrationArticles.map((article) => {
            article.issue = 'Immigration'
            return article
        })
        Issue.insertMany(taggedImmigrationArticles).then((data) => {
            console.log(data)
        })
    })
}


// On open, add all the articles to the database
db.on("open", () => {
    addBabyFormula()
    addClimate()
    addCovid()
    addImmigration()
})


