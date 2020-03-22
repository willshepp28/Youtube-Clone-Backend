'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING
  }, {});
  Channel.associate = function(models) {
    // associations can be defined here
    Channel.belongsTo(models.User, { foreignKey: 'user_id'});
    Channel.hasMany(models.Video, { foreignKey: 'channel_id'});
  };
  return Channel;
};