'use strict';
module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define('Room', {
    roomNumber: DataTypes.STRING,
    roomCapacity: DataTypes.INTEGER
  }, {});
  Room.associate = function(models) {
    // associations can be defined here
  };
  return Room;
};