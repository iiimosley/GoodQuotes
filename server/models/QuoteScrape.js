'use strict';

const fetch = require('node-fetch');

module.exports.getQuotesByTag = (tag) => {
  return fetch(`https://www.goodreads.com/quotes/tag/${tag}`)
  .then(response => response.text());
}

module.exports.getQuotesByAuthor = (name) => {
  return fetch(`https://www.goodreads.com/search?q=${name}&search[source]=goodreads&search_type=quotes&tab=quotes`)
  .then(response => response.text());
}

module.exports.getQuotesByTitle = (title) => {
  return fetch(`https://www.goodreads.com/search?q=${title}&search_type=quotes&search%5Bfield%5D=title`)
  .then(response => response.text());
}