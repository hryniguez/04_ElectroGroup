'use strict';


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Images', [{
        name:"photo",
        path:null,
        product_id:0,
        createdAt: new Date,
        updatedAt: new Date,
      }], {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('images', null, {});
  }
};
