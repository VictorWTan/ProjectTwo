// Running tests to check API results

const NewsAPI = require('newsapi')
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c')

newsapi.v2.everything({
    sources: 'cnn',
    q: 'climate change',
    language: 'en',
}).then(res => {
    console.log(res)
})