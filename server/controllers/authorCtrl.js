'use strict';

const cheerio = require('cheerio');
const { getQuotesByAuthor } = require('../models/QuoteScrape');

const captilizeAuth = (authStr) => authStr.split('+').map(name => name.slice(0, 1).toUpperCase() + name.slice(1, name.length)).join(" ").trim();

module.exports.getAuthorQuotes = (req,res,next) => {
  getQuotesByAuthor(req.params.name, req.query.page)
  .then(body => {
    let $ = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: false
    });

    console.log(`\n${req.query.page}\n`);

    let quoteData = {};
    let pageNumArr = $('.next_page')[0].parent.children
    quoteData.current_page = !req.query.page ? 1 : +req.query.page;
    quoteData.total_pages = +pageNumArr[pageNumArr.length - 3].children[0].data;
    let allQuotes = [];

    $('.quoteText').each((i, el) => {
      let searchAuthor = captilizeAuth(req.params.name);
      let newQuote = {};

      if ($(el).find('.authorOrTitle').length < 2) {
        newQuote = {
          quote: el.children[0].data.trim().replace(/[“”"\"]/g, ''),
          author: $(el).find('.authorOrTitle')[0].children[0].data,
          publication: null,
        };
      } else {
        newQuote = {
          quote: el.children[0].data.trim().replace(/[“”"\"]/g, ''),
          author: $(el).find('.authorOrTitle')[0].children[0].data,
          publication: $(el).find('.authorOrTitle')[1].children[0].data,
        };
      }
      allQuotes.push(newQuote);
    });
    quoteData.quotes = allQuotes;
    res.status(200).json(quoteData);
  })
  .catch(err => res.status(500).json(err));
};