# GoodQuotes

GoodQuotes is a RESTful API servicing webscraped data from GoodReads quote search engine. Webscraping was completed with **Cheerio.JS**. Client side rendering of API's user interface was leveraged with **Vue.Js**. Vue is a fast, powerful, legible, and scalable front-end framework that shares many of the best collected attributes of other leading frontend frameworks.

The **SmartQuote** feature compiles all collected quotes by the user and processes a keyword return from **IBM Watson**. Then, fetches a quote based on a keyword return.

**Amazon Alexa Skill** was constructed in tandem with the Good Quotes API. The GoodQuotes Alexa skill will give you a random quote based on the user utterance of either a tag, author, or title matching the skills intent. [Repository](https://github.com/iiimosley/GoodQuotesAlexaSkill) for the skill.

#### Deployed Location
**Current deployment**: https://goodquotesapi.herokuapp.com/

Basic access to API's webscraping features. No user features currently deployed.


## API
Direct access to API will be located on `localhost:8080` by default (Not directly available to development, `localhost:8081` || Global conditionals in place to run API queries in both environments)

All initial queries need a `+` separated between each word

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

## User Features
Upon Login/Registration, users have access to: 

**Searching+saving quotes:** 
+ Starring quotes adds the quote to the database
  + If quote already exists in DB, new row will be created on `User_Quotes` containing selected `quote_id` and current `user_id`
  + If quote does not exist in DB, new row will be created on `Quotes` tablefor the starred quote. Then, a new row is created on `User_Quotes` containing the new `quote_id` and the current `user_id`
+ Unstarring quotes removes the `User_Quotes` row from the database
  + The `quote_id` will be selected based upon the contents of the quote unstarred
  + The row containing the selected `quote_id` and current `user_id` will be removed from `User_Quotes` table

**SmartQuote generator:**

SmartQuote feature 
1. Compiles all quotes correlated to the current `user_id`
1. Concatenates all quotes to one string
1. Processes the string through **IBM Watson NLU** 
1. Randomly selects a keyword from the Watson return 
1. Runs the selected keyword through the GoodQuotes API tag query 
1. Randomly selects and quote from the returned GoodQuotes query
1. Renders the selected quote to the SmartQuote page

### To Run Locally:
First, clone this repo and install packages
```
$ git clone https://github.com/iiimosley/GoodQuotes.git
$ cd GoodQuotes && npm install
```
Then, instantiate the initial build.
```
$ npm run build
```

**Initialize Database**
Load PostGreSQL client Open PostGreSQL in your terminal; `psql` || your set alias.
Create the appropriate database locally with the following command:
```
<username>=# CREATE DATABASE goodquotes;
```
Connect to the database
```
<username>=# \c goodquotes;
```
In a seperate window, outside the `psql` shell, direct into the `api` directory of the project and initialize sequelize
```
$ cd api && sequelize init
```
In the created `.api/config/config.json`, from the first object:
  * remove `username` and `password`
  * change `database` value to `goodquotes`
  * change `dialect` value to `postgresql`
Finally, initialize the database with the constructed seeder data
```
/// if in api directory
$ node buildDB.js

/// if in root directory
$ node api/buildDB.js
```


**Development Environment**
Run the development environment
```
$ npm run dev
```
If the API and Client side render to the same server (default: `8080`), please run these commands seperately in this order
```
$ npm run server
$ npm run vue
```

**Production Environment**
Run the initial server
```
$ npm start
```

## Technologies Utilized
- [Node](https://nodejs.org/): Chrome V8 Runtime Environemnt
- [Express](https://expressjs.com/): Routing and API Development
- [Vue](https://vuejs.org/): Client/UI Development
- [PostGreSQL](https://www.postgresql.org/): ORDBMS
- [Sequelize](http://docs.sequelizejs.com/): SQL ORM for Node
- [AWS Lambda](https://aws.amazon.com/lambda/)/[Amazon Alexa Skill](https://developer.amazon.com/alexa-skills-kit/): Random quote generator on User Input
- [IBM Watson Natural Language Understanding](https://www.ibm.com/watson/services/natural-language-understanding/): SmartQuote feature
