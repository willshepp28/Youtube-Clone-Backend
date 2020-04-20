'use strict';
module.exports = (sequelize, DataTypes) => {
  const verifyToken = sequelize.define('verifyToken', {
    token: DataTypes.TEXT
  }, {});
  verifyToken.associate = function(models) {
    // associations can be defined here
    verifyToken.belongsTo(models.User, { foreignKey: 'user_id'});
  };
  return verifyToken;
};