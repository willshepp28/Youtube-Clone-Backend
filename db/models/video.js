'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    streaming_url: DataTypes.TEXT,
    thumbnail_url: DataTypes.TEXT
  }, {});
  Video.associate = function(models) {
    // associations can be defined here
    Video.belongsTo(models.User, { foreignKey: 'user_id'});
    Video.hasMany(models.Comment, { foreignKey: 'video_id'})
  };
  return Video;
};