# GoodQuotes

GoodQuotes is a RESTful API servicing webscraped data from GoodReads quote search engine. Webscraping was completed with Cheerio.JS

Client side rendering of API's user interface was leveraged with Vue.Js. Vue is a fast, powerful, legible, and scalable front-end framework that shares many of the best collected attributes of other leading frontend frameworks.

In progress: 
+ Authenication via Passport
+ _SmartQuote_ rendering via IBM Watson Natural Language Understanding API
+ Deployment to Heroku

### To Run Locally:
First, clone this repo
```
git clone https://github.com/iiimosley/GoodQuotes.git
```
To activate the server, please run the following commands:
```
cd server
npm start
```
To activate client, please run the following commands:
```
cd client
npm run dev
```

### API
All initial queries need a + separated between each word

+ Example: `/author/george+r+r+martin`

Query for additional pages with `?page=#`

Example: `/title/brave+new+world?page=3`

**Search by Tag**

Query: `/tag/...`

Example: `/tag/wisdom`

**Search by Author**

Query: `/author/...`

Example: `/author/tom+robbins`

**Search by Title**

Query: `/title/...`

Example: `/title/crime+and+punishment`

