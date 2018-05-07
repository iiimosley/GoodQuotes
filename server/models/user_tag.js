'use strict';
module.exports = (sequelize, DataTypes) => {
  var User_Tag = sequelize.define('User_Tag', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }, { tableName: "user_tags", timestamps: false });
  User_Tag.associate = function(models) {
    User_Tag.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    }),
    User_Tag.belongsTo(models.Tag, {
      foreignKey: 'tag_id',
      onDelete: 'CASCADE'
    })
  };
  return User_Tag;
};
