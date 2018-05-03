'use strict';

const cheerio = require('cheerio');
const {getQuotesByAuthor} = require('../models/QuoteScrape');

const captilizeAuth = (authStr) => authStr.split('+').map(name => name.slice(0, 1).toUpperCase() + name.slice(1, name.length)).join(" ").trim();

module.exports.getAuthorQuotes = (req,res,next) => {
  getQuotesByAuthor(req.params.name)
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
      let searchAuthor = captilizeAuth(req.params.name);
      let quoteAuthor = "";
      let quotePublication = "";
      let newQuote = {};
      for (let j = 0; j < el.children.length; j++) {
        if (el.children[j].name === 'a' && el.children[j].children[0].data === searchAuthor) {
          quoteAuthor = el.children[j].children[0].data;
        }
        else if (el.children[j].name === 'a' && el.children[j].children[0].data !== searchAuthor) {
          quotePublication = el.children[j].children[0].data;
          quoteAuthor = searchAuthor;
        }
      }
      if (quotePublication) {
        newQuote = {
          quote: el.children[0].data.trim().replace(/“/, '').replace(/”/, '').replace(/"/, '').replace(/\"/g, ''),
          author: quoteAuthor,
          publication: quotePublication
        };
      } else {
        newQuote = {
          quote: el.children[0].data.trim().replace(/“/, '').replace(/”/, '').replace(/"/, '').replace(/\"/g, ''),
          author: quoteAuthor
        };
      }
      allQuotes.push(newQuote);
    });
    quoteData.quotes = allQuotes;
    res.status(200).json(quoteData);
  })
  .catch(err => res.status(500).json(err));
};