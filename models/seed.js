const mongoose = require('./connection')
const Issue = require('./issue')
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c');
const Comment = require('./comment')

const db = mongoose.connection

const clearComments = () => {
    Comment.deleteMany({}).then((data) => {
        console.log(data)
    })
    .catch((error) => {
        res.json({error})
    })
}

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
        article.comments = []
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
            article.comments = []
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
            article.comments = []
            return article
        })
        Issue.insertMany(taggedCovidArticles).then((data) => {
            console.log(data)
        })
    })
}

const addImmigration= () => {
    // Query for all the articles related to immigration from CNN
    newsapi.v2.everything({
        sources: 'cnn',
        q: 'immigration',
        language: 'en',
    })
    .then((res) => {
        // Then sets the array of articles to a variable
        let immigrationArticles = res.articles
        // Map all the variables to a new array with new issue and comments field and value
        let taggedImmigrationArticles = immigrationArticles.map((article) => {
            article.issue = 'Immigration'
            article.comments = []
            return article
        })
        Issue.insertMany(taggedImmigrationArticles).then((data) => {
            console.log(data)
        })
    })
}


const makeQuery = (runData)=>{
    return new Promise((resolve, reject) => {
        resolve(runData())
    }) 
}



// On open, add all the articles to the database
db.on("open", async() => {
    await makeQuery(clearComments)
    await makeQuery(addBabyFormula)
    await makeQuery(addClimate)
    await makeQuery(addCovid)
    await makeQuery(addImmigration)
})


