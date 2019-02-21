'use strict';
module.exports = (sequelize, DataTypes) => {
  const Guest = sequelize.define('Guest', {
    name: DataTypes.STRING
  }, {});
  Guest.associate = function(models) {
    // associations can be defined here
  };
  return Guest;
};