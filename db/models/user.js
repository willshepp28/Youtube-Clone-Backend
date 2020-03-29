'use strict';
const hashPassword = require("../../helpers/encryption/hash-passwords.encrytion");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    password: DataTypes.TEXT,
    profile_pic: {
      type: DataTypes.TEXT,
      defaultValue: "https://elitebasketballny.com/wp-content/uploads/2018/07/profile-placeholder.png"
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await hashPassword(user.password);
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Video, { foreignKey: 'user_id'});
    User.hasMany(models.Comment, { foreignKey: 'user_id'});
    User.hasMany(models.Thumbnail, { foreignKey: 'user_id'});
  };
  return User;
};