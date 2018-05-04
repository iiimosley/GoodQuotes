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
    quoteData.current_page = !req.query.page ? 1 : +req.query.page;
    quoteData.total_pages = pageNumArr[pageNumArr.length - 3].children[0].data;
    quoteData.quotes = [];
    $('.quoteText').each((i, el) => {
      let newQuote = {};
      if ($(el).find('.authorOrTitle').length < 2) {
        newQuote = {
          quote: $(el).text().split('―')[0].trim().replace(/[“”"\"]/g, '').replace(/\s\s+/g, ' '),
          author: $(el).find('.authorOrTitle')[0].children[0].data,
          publication: null,
        };
      } else {
        newQuote = {
          quote: $(el).text().split('―')[0].trim().replace(/[“”"\"]/g, '').replace(/\s\s+/g, ' '),
          author: $(el).find('.authorOrTitle')[0].children[0].data,
          publication: $(el).find('.authorOrTitle')[1].children[0].data,
        };
      }
      quoteData.quotes.push(newQuote);
    });
    res.status(200).json(quoteData);
  })
  .catch(err => res.status(500).json(err));
};