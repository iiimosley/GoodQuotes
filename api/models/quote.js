'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quote = sequelize.define('Quote', {
    content: DataTypes.TEXT,
    author: DataTypes.STRING
  }, { tableName: "quotes", timestamps: false });
  Quote.associate = function(models) {
    Quote.hasMany(models.User_Quote, {
      foreignKey: 'quote_id'
    })
  };
  return Quote;
};