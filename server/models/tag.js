'use strict';
module.exports = (sequelize, DataTypes) => {
  var Tag = sequelize.define('Tag', {
    tag_name: DataTypes.STRING
  }, { tableName: "tags", timestamps: false });
  Tag.associate = function(models) {
    // associations can be defined here
  };
  return Tag;
};