const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('1372cfdb6df94089bdb9ceb7f8b5ae9c');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
  sources: 'the-verge',
  q: 'bitcoin',
  language: 'en'
}).then(response => {
  console.log(response);
  
})