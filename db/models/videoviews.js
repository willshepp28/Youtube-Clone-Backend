'use strict';
module.exports = (sequelize, DataTypes) => {
  const VideoViews = sequelize.define('VideoViews', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    video_id:  {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  VideoViews.associate = function(models) {
    // associations can be defined here
    VideoViews.belongsTo(models.User, { foreignKey: 'user_id'});
    VideoViews.belongsTo(models.Video, { foreignKey: 'video_id'});
  };
  return VideoViews;
};