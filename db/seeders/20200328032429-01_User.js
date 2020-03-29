'use strict';
require('dotenv').config()

const { hashManyPasswords } = require("../../helpers/encryption/encrypt.encryption");
const {getUsers} = require("../../helpers/seed-builder/user-builder.seeder");


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return getUsers().then(users => {
    return hashManyPasswords(users).then(() => {
      return queryInterface.bulkInsert("Users", users);
    }) 
  })
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete("Users",null, {});
  }
};
