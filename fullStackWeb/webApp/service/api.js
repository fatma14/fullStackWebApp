const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);

const getTopHeadlines = () => {

return newsapi.v2.sources().then(response => {
  return response;
})
.catch(err => {
  return console.log(err)
})
}


module.exports = {getTopHeadlines}