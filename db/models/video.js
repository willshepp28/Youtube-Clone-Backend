'use strict';
module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define('Video', {
    streaming_url: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    thumbnail_url: {
      type: DataTypes.TEXT,
      defaultValue: null
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
    },
  key: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true
  },
    processed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }

  }, {});
  Video.associate = function(models) {
    // associations can be defined here
    Video.belongsTo(models.User, { foreignKey: 'user_id'});
    Video.belongsTo(models.Channel, { foreignKey: 'channel_id'});
    Video.hasMany(models.Comment, { foreignKey: 'video_id'});
  };
  return Video;
};