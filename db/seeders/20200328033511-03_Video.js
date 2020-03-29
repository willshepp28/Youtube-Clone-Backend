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
   return queryInterface.bulkInsert("Videos", [
     {
      user_id: 1,
      channel_id: 1,
      streaming_url: "",
      thumbnail_url: "",
      title: "The Most Eye Opening 10 Minutes of Your Life | David Goggins",
      description: "What does it take to be the TOUGHEST MAN ALIVE? Watch this video to find out! David Goggins is a retired Navy SEAL, and accomplished ultra-endurance athlete. He is also the Guinness 24-hour pull-up world record holder with 4030 repetitions. There is a lot we can learn from this inspiring man.",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 1,
      channel_id: 1,
      streaming_url: "",
      thumbnail_url: "",
      title: "When Things Get Tough",
      description: "When things get touch keep going.Never give up, and remeber tough times dont last, tough people do.",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 2,
      channel_id: 2,
      streaming_url: "",
      thumbnail_url: "",
      title: "The Best Vacation / Travel Tech Gear!",
      description: "Its vacation time for many people and we've put together a list of the best COMPACT tech for a travel bag or backpack that you should bring on your trip / travel time!",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 2,
      channel_id: 2,
      streaming_url: "",
      thumbnail_url: "",
      title: "7 Essential Pieces of Gear Every Filmmaker Needs",
      description: "For help, tips and tricks on getting the best filmmaking gear, check out Seb' new GEAR GUIDE: ",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 3,
      channel_id: 3,
      streaming_url: "",
      thumbnail_url: "",
      title: "Leave-in Conditioner on LOCS, YAY or NAY?",
      description: "Check out this black man owned natural hair product business: www.alocsstore.com",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 4,
      channel_id: 4,
      streaming_url: "",
      thumbnail_url: "",
      title: "Simple Steps to Financial Freedom",
      description: "Get exclusive videos & support this ad-free channel.",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      user_id: 5,
      channel_id: 5,
      streaming_url: "",
      thumbnail_url: "",
      title: "Dr.Sebi Alkaline Food List 2019",
      description: "Visionaries, sharing the latest Dr. Sebi Alkaline Food List 2019. If you are starting your Dr. Sebi diet or just need a quick video for reference thanks for visiting. I am embarking on my alkaline diet journey and will be sharing my experiences, favorite foods, recipes, inspiration and more here. So please like share and subscribe!",
      createdAt: new Date(),
      updatedAt: new Date()
     },
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


// id: {
//   allowNull: false,
//   autoIncrement: true,
//   primaryKey: true,
//   type: Sequelize.INTEGER
// },
// user_id: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   references: {
//     model: 'Users',
//     key: 'id'
//   }
// },
// channel_id: {
//   type: Sequelize.INTEGER,
//   allowNull: false,
//   references: {
//     model: 'Channels',
//     key: 'id'
//   }
// },
// streaming_url: {
//   type: Sequelize.TEXT
// },
// thumbnail_url: {
//   type: Sequelize.TEXT
// },
// createdAt: {
//   allowNull: false,
//   type: Sequelize.DATE
// },
// updatedAt: {
//   allowNull: false,
//   type: Sequelize.DATE
// }
// });