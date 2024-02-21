'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name:{
        type: Sequelize.STRING,
        allowNull: false
      },
      precio: {
        type: Sequelize.INTEGER
      },
      brand_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName:'Brands'}, 
          key:'id'
        }
      },
      description_id: {
        type: Sequelize.INTEGER,
        references: {
          model:{
            tableName:'Descriptions'}, 
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};