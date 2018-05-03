'use strict';

const express = require('express');
const app = express();
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const fetch = require('node-fetch');
const routes = require('./server/routes');


const scrapeHTML = (html) => {
    let $ = cheerio.load(html)
    let newJSON = {};
}



app.use(routes);


// app.get('/tag/:tag', function (req, res, next) {
//     fetch(`https://www.goodreads.com/quotes/tag/${req.params.tag}`)
//     .then(response => response.text())
//     .then(body => {
//         let $ = cheerio.load(body, {
//                 normalizeWhitespace: true,
//                 xmlMode: false
//             });
//         let quoteData = {};
//         let pageNumArr = $('.next_page')[0].parent.children
//         quoteData.total_pages = pageNumArr[pageNumArr.length-3].children[0].data;
//         let allQuotes = [];
//         $('.quoteText').each((i, el) => {
//             let quoteAuthor = "";
//             for (let j = 0; j < el.children.length; j++){
//                 if (el.children[j].name === 'a') quoteAuthor = el.children[j].children[0].data;
//             }
//             let newQuote = {
//                 quote: el.children[0].data.trim().replace(/“/, '').replace(/”/, ''),
//                 author: quoteAuthor
//             };
//             allQuotes.push(newQuote);
//         });
//         quoteData.quotes = allQuotes;
//         res.status(200).json(quoteData);
//     })
//     .catch(err=>res.status(500).json(err));
// });

// app.get('/author/:name', (req, res, next)=>{
//     fetch(`https://www.goodreads.com/search?q=${req.params.name}&search[source]=goodreads&search_type=quotes&tab=quotes`)
//     .then(response => response.text())
//     .then(body => {
//         scrapeHTML(body);
//         let $ = cheerio.load(body, {
//             normalizeWhitespace: true,
//             xmlMode: false
//         });

//         let quoteData = {};
//         let pageNumArr = $('.next_page')[0].parent.children
//         quoteData.total_pages = pageNumArr[pageNumArr.length - 3].children[0].data;
//         let allQuotes = [];

//         $('.quoteText').each((i, el) => {
//             let searchAuthor = captilizeAuth(req.params.name);
//             let quoteAuthor = "";
//             let quotePublication = "";
//             let newQuote = {};
//             for (let j = 0; j < el.children.length; j++) {
//                 if (el.children[j].name === 'a' && el.children[j].children[0].data === searchAuthor){ 
//                     quoteAuthor = el.children[j].children[0].data;
//                 }
//                 else if (el.children[j].name === 'a' && el.children[j].children[0].data !== searchAuthor){ 
//                     quotePublication = el.children[j].children[0].data;
//                     quoteAuthor = searchAuthor;
//                 }
//             }
//             if (quotePublication){
//                 newQuote = {
//                     quote: el.children[0].data.trim().replace(/“/, '').replace(/”/, '').replace(/"/, '').replace(/\"/g, ''),
//                     author: quoteAuthor,
//                     publication: quotePublication
//                 };
//             } else {
//                 newQuote = {
//                     quote: el.children[0].data.trim().replace(/“/, '').replace(/”/, '').replace(/"/, '').replace(/\"/g, ''),
//                     author: quoteAuthor
//                 };
//             }
//             allQuotes.push(newQuote);
//         });
//         quoteData.quotes = allQuotes;
//         res.status(200).json(quoteData);
//     })
//     .catch(err => res.status(500).json(err));
// })


app.listen('8081')

console.log('Magic happens on port 8081');

exports = module.exports = app;
