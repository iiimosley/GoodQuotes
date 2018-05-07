'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    tag_content: DataTypes.STRING
  }, { tableName: "tags", timestamps: false });
  Tag.associate = function(models) {
    Tag.hasMany(models.User_Tag, {
      foreignKey: 'tag_id'
    })
  };
  return Tag;
};