'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('brands', [{
      name: 'HP',
      createdAt:new Date,
      updatedAt:new Date,
      }], {});
    
  },

  async down (queryInterface, Sequelize) {

  await queryInterface.bulkDelete('brands', null, {});

  }
};
