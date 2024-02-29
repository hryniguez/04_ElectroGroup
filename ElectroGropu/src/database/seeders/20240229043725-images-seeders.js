'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('images', [{
        name:"photo",
        path:"/public/img",
        product_id:1,
        createdAt: new Date,
        updatedAt: new Date,
      }], {});

  },

  async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('images', null, {});
  }
};
