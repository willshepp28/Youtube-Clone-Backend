'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.sequelize.transaction((t) => {
    return Promise.all([
      queryInterface.dropTable('Thumbnails', {transaction: t}),

      // User
        // queryInterface.removeColumn('Users','id', { transaction: t}),
        // queryInterface.addColumn('Users','UUID', {
        //   type: Sequelize.UUID,
        //   allowNull: false,
        //   primaryKey: true,
        //   defaultValue: Sequelize.UUIDV4
        // }, { transaction: t})
    ])
})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
