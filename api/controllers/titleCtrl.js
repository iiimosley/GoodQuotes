'use strict';

const cheerio = require('cheerio');
const { getQuotesByTitle } = require('../factories/QuoteScrape');

const captilizeAuth = (authStr) => authStr.split('+').map(name => name.slice(0, 1).toUpperCase() + name.slice(1, name.length)).join(" ").trim();


module.exports.getTitleQuotes = (req, res, next) => {
  getQuotesByTitle(req.params.title, req.query.page)
  .then(body => {
    let $ = cheerio.load(body, {
      normalizeWhitespace: true,
      xmlMode: false
    });

    let quoteData = {};
    let pageNumArr = $('.next_page')[0].parent.children
    quoteData.current_page = !req.query.page ? 1 : +req.query.page;
    quoteData.total_pages = +pageNumArr[pageNumArr.length - 3].children[0].data;
    quoteData.quotes = [];

    $('.quoteText').each((i, el) => {
      // console.log('\n\n',$(el).find('.authorOrTitle'))
      quoteData.quotes.push({
        quote: $(el).text().split('—')[0].trim().replace(/[“”"\"]/g, ''),
        author: $(el).find('.authorOrTitle')[0].children[0].data,
        publication: $(el).find('.authorOrTitle').length < 2 ? null : $(el).find('.authorOrTitle')[1].children[0].data,
      });
    });
    res.status(200).json(quoteData);
  })
  .catch(err => res.status(418).json(err));
};