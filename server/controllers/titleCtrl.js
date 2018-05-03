'use strict';

const cheerio = require('cheerio');
const { getQuotesByTitle } = require('../models/QuoteScrape');

const captilizeAuth = (authStr) => authStr.split('+').map(name => name.slice(0, 1).toUpperCase() + name.slice(1, name.length)).join(" ").trim();

module.exports.getTitleQuotes = (req, res, next) => {
  getQuotesByTitle (req.params.title)
  .then(body => {
    let $ = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: false
    });

    let quoteData = {};
    let pageNumArr = $('.next_page')[0].parent.children
    quoteData.total_pages = pageNumArr[pageNumArr.length - 3].children[0].data;
    let allQuotes = [];

    $('.quoteText').each((i, el) => {
      let thisObj = $(el).find('.authorOrTitle');

      let newQuote = {};

      newQuote = {
        quote: el.children[0].data.trim().replace(/[“”"\"]/g, ''),
        author: $(el).find('.authorOrTitle')[0].children[0].data,
        publication: $(el).find('.authorOrTitle')[1].children[0].data
      };
      
      allQuotes.push(newQuote);
    });
    quoteData.quotes = allQuotes;
    res.status(200).json(quoteData);
  })
  .catch(err => res.status(500).json(err));
};