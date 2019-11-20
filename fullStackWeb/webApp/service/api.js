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
  if (user.preferences.length === 0 && user.category.length === 0) {
    return newsapi.v2.everything({
      q: "general"
    })
  }
  
  return newsapi.v2.everything({
      q: user.category && user.category.join(','),
      sources: user.preferences && user.preferences.join(','),
      //language: user.languages[math.floor(math.random()*4)]
    })
    .then(response => {
      
      return response;
    })
    .catch(err => {
      console.log("Error", err)
    })
}



module.exports = {
  getTopHeadlines,
  getArticles
}