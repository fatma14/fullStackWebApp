const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
const getTopHeadlines = () => {

return newsapi.v2.topHeadlines({
  sources: 'bbc-news,the-verge',
  // q: 'bitcoin',
  // category: 'business',
  // language: 'en',
  // country: 'us'
}).then(response => {
return response

})
.catch(err => {
  return console.log(err)
})
}

module.exports = {getTopHeadlines}