'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    reply: DataTypes.TEXT
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: 'user_id'})
    Comment.belongsTo(models.Video, { foreignKey: 'video_id'})
  };
  return Comment;
};