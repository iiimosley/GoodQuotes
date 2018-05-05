'use strict';

const fetch = require('node-fetch');


const hasQuery = q => isNaN(q) ? "" : `page=${q}&`;

const queryExtension = (p, q, str) => isNaN(q) ? `https://www.goodreads.com/search?q=${p}&search_type=quotes&search%5Bfield%5D=${str}`
: `https://www.goodreads.com/search?page=${q}&q=${p}&search%5Bfield%5D=${str}&search%5Bsource%5D=goodreads&search_type=quotes&tab=quotes`;


module.exports.getQuotesByTag = (tag) => {
  return fetch(`https://www.goodreads.com/quotes/tag/${tag}`)
  .then(response => response.text());
}

module.exports.getQuotesByAuthor = (name, query) => {
  // return fetch(`https://www.goodreads.com/search?q=${name}&search[source]=goodreads&search_type=quotes&tab=quotes`)
  return fetch(`${queryExtension(name, query, "author")}`)
  .then(response => response.text());
}

module.exports.getQuotesByTitle = (title, query) => {
  return fetch(`${queryExtension(title, query, "title")}`)
  .then(response => response.text());
}