'use strict';

const fetch = require('node-fetch');

module.exports.getQuotesByTag = (tag) => {
  return fetch(`https://www.goodreads.com/quotes/tag/${tag}`)
    .then(response => response.text());
}

