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
      validate: {
        notEmpty: {
          msg: 'First name is required'
        }
      },
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Last name is required'
        }
      },
    },
    birthday: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Birthday is required'
        }
      },
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false,
    }
    }, { sequelize });

  return Member;
};