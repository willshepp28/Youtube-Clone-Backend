'use strict';
// const hashPassword = require("../../helpers/encryption/hash-passwords.encrytion");
const {hashPassword} = require("../../helpers/encryption/encrypt.encryption");


module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type : DataTypes.TEXT,
      allowNull: false
    },
    profile_pic: {
      type: DataTypes.TEXT,
      defaultValue: "https://elitebasketballny.com/wp-content/uploads/2018/07/profile-placeholder.png"
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    has_channel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
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
  };
  return User;
};