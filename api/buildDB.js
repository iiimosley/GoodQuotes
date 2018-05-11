'use strict';

let models = require('./models');

let { users } = require('./seeders/data/users');
let { quotes } = require('./seeders/data/quotes');
let { tags } = require('./seeders/data/tags');
let { userQuotes } = require('./seeders/data/userQuotes');
let { userTags } = require('./seeders/data/userTags');

models.sequelize.sync({ force: true })
  .then(() => models.User.bulkCreate(users))
  .then(() => models.Quote.bulkCreate(quotes))
  .then(() => models.Tag.bulkCreate(tags))
  .then(() => models.User_Quote.bulkCreate(userQuotes))
  .then(() => models.User_Tag.bulkCreate(userTags))
  .then(() => process.exit());
