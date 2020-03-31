'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return Promise.all([
    queryInterface.addColumn("Users", "firstName", {
      type: Sequelize.STRING,
      defaultValue: null
     }),
     queryInterface.addColumn("Users", "lastName", {
      type: Sequelize.STRING,
      defaultValue: null
     }),
   ])
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   return Promise.all([
     queryInterface.removeColumn("Users", "firstName"),
     queryInterface.removeColumn("Users", "lastName")
   ])
  }
};
