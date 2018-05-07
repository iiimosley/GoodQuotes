'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Quote = sequelize.define('User_Quote', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, { tableName: "user_quotes", timestamps: false });
  User_Quote.associate = function(models) {
    User_Quote.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    }),
    User_Quote.belongsTo(models.Quote, {
      foreignKey: 'quote_id',
      onDelete: 'CASCADE'
    })
  };
  return User_Quote;
};