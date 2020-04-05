require('dotenv').config();

const axios = require("axios");
const _ = require("lodash");



/**
 *  getUsers populates the database with 100 users
 * 
 *  1. Users axios to make a http request to randomuser api
 *  2. Pushs each user in the seeds array then returns to results
 */

async function getUsers() {
    return await axios.get('https://randomuser.me/api/?results=5')
      .then(data => {
          let seeds = [];
          let users = data.data.results;
        
         _.forEach(users, (user) => {
             seeds.push({ 
                 fullName: `${user.name.first} ${user.name.last}`,
                 firstName: user.name.first,
                 lastName: user.name.last,
                 profile_pic: user.picture.medium,
                 password: process.env.SEED_USER_PASSWORD,
                 email: user.email,
                 createdAt: new Date(),
                 updatedAt: new Date()
             })
        })
        return seeds;
      }) 
      .catch(error => {
         console.log(error)
      })
};


module.exports = {getUsers};