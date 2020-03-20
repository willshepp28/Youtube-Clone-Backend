'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    password: DataTypes.TEXT,
    profile_pic: DataTypes.TEXT
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Video, { foreignKey: 'user_id'});
    User.hasMany(models.Comment, { foreignKey: 'user_id'})
  };
  return User;
};