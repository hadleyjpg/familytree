'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Member extends Sequelize.Model {}
  Member.init({
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

  return Member;
};