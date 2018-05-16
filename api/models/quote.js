'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quote = sequelize.define('Quote', {
    quote_content: DataTypes.STRING,
    author: DataTypes.STRING
  }, { tableName: "quotes", timestamps: false });
  Quote.associate = function(models) {
    Quote.hasMany(models.User_Quote, {
      foreignKey: 'quote_id'
    })
  };
  return Quote;
};