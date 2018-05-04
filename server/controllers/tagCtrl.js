'use strict';

const cheerio = require('cheerio');
const {getQuotesByTag} = require('../models/QuoteScrape');

module.exports.getTagQuotes = (req, res, next) => {
  getQuotesByTag(req.params.tag)
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
      let quoteAuthor = "";
      for (let j = 0; j < el.children.length; j++) {
        if (el.children[j].name === 'a') quoteAuthor = el.children[j].children[0].data;
      }
      let newQuote = {
        quote: el.children[0].data.trim().replace(/“”/g, ''),
        author: quoteAuthor
      };
      allQuotes.push(newQuote);
    });
    quoteData.quotes = allQuotes;
    res.status(200).json(quoteData);
  })
  .catch(err => res.status(500).json(err));
};