const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.API_KEY);
const User = require("../models/User");

const getTopHeadlines = () => {

  return newsapi.v2.sources()
    .then(response => {
      return response;
    })
    .catch(err => {
      return console.log(err)
    })
}

const getArticles = (user) => {
  console.log('USER FROM API CALL', user)
  return newsapi.v2.everything({
      q: user.category && user.category.join(','),
      sources: user.preferences && user.preferences.join(','),
      //language: user.languages[math.floor(math.random()*4)]
    })
    .then(response => {
      console.log('RESPONSE', response)
      return response;
    })
    .catch(err => {
      return console.log(err)
    })
}
module.exports = {
  getTopHeadlines,
  getArticles
}