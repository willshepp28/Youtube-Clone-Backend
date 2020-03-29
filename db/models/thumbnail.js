'use strict';
module.exports = (sequelize, DataTypes) => {
  const Thumbnail = sequelize.define('Thumbnail', {
    thumbnail_url: DataTypes.TEXT
  }, {});
  Thumbnail.associate = function(models) {
    // associations can be defined here
    Thumbnail.belongsTo(models.User, { foreignKey: 'user_id'});
    Thumbnail.belongsTo(models.Video, { foreignKey: 'video_id'});
  };
  return Thumbnail;
};