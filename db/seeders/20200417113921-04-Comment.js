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
   return queryInterface.bulkInsert('Comments', [
     {
      user_id: 4,
      video_id: 52,
      reply: 'David goggins is the man',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 1,
      video_id: 52,
      reply: 'Thank you. I feel so motivated',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 2,
      video_id: 52,
      reply: 'This man inspires me to wake up everyday, and put my best foot foward',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 5,
      video_id: 52,
      reply: 'Here for the comments',
      createdAt: new Date(),
      updatedAt: new Date()
     }
   ])
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
