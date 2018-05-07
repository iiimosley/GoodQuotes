'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quote = sequelize.define('Quote', {
    quote: DataTypes.STRING
  }, { tableName: "quotes", timestamps: false });
  Quote.associate = function(models) {
    // associations can be defined here
  };
  return Quote;
};