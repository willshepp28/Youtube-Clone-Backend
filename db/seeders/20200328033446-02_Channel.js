'use strict';

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
   return queryInterface.bulkInsert("Channels", [
    {
      user_id: 1,
      name: "AWESOMESONGZ",
      description: "a channel showcasing all the hottest songs out now",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 2,
      name: "Gear Heads",
      description: "Car and Truck Builds, How To's, Racing, Offroading, Featured Cars, and more! We Are GearHeads!",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 3,
      name: "Loc Sista",
      description: "All about the loc journey and process",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 4,
      name: "Financial University",
      description: "Educating you about money finances, and investing",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      user_id: 5,
      name: "Holstic Healing",
      description: "A page dedicated to learning and understanding the principles of holistic healing. Everyone welcome, join us",
      createdAt: new Date(),
      updatedAt: new Date()
    },
   ], {})
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
