# GoodQuotes

GoodQuotes is a RESTful API servicing webscraped data from GoodReads quote search engine. Webscraping was completed with Cheerio.JS

Client side rendering of API's user interface was leveraged with Vue.Js. Vue is a fast, powerful, legible, and scalable front-end framework that shares many of the best collected attributes of other leading frontend frameworks.

In progress: 
+ Authenication via Passport
+ Single Server Environment
+ _SmartQuote_ rendering via IBM Watson Natural Language Understanding API
+ Deployment to Heroku

### To Run Locally:
First, clone this repo
```
git clone https://github.com/iiimosley/GoodQuotes.git
```
Then, instantiate the initial build.
```
npm run build
```
& Run the development environment
```
npm run dev
```

### API
Direct access to API will be located on `localhost:8080` (development environment will be `localhost:8081`)

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

