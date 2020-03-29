'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    streaming_url: DataTypes.TEXT,
    thumbnail_url: DataTypes.TEXT
  }, {});
  Video.associate = function(models) {
    // associations can be defined here
    Video.belongsTo(models.User, { foreignKey: 'user_id'});
    Video.belongsTo(models.Channel, { foreignKey: 'channel_id'});
    Video.hasMany(models.Comment, { foreignKey: 'video_id'});
    Video.hasMany(models.Thumbnail, { foreignKey: 'video_id'});
  };
  return Video;
};