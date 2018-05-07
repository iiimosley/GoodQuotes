'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, { tableName: "users", timestamps: false });
  User.associate = function(models) {
    User.hasMany(models.User_Quote, {
      foreignKey: 'user_id'
    }),
    User.hasMany(models.User_Tag, {
      foreignKey: 'user_id'
    });
  };
  return User;
};