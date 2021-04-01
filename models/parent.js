'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Parent extends Sequelize.Model {}
  Parent.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthday: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    }, { sequelize });
  
    Parent.associate = (models) => {
        Parent.hasMany(models.Child, { foreignKey: 'childId' });
    };

  return Parent;
};