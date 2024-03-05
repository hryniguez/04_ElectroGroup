'use strict';
const fs= require('fs')
const path = require("path");
const products =JSON.parse(fs.readFileSync(path.join (__dirname,"../seeders/products.json"), "utf-8"));
const data= products.map(product=>{
  product.brand_id= 1;
  product.description_id=1;
  product.createdAt=new Date;
  product.updatedAt=new Date;
  return product
  }
)
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert('products', data, {});
  },

  async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete('products', null, {});
  }
};
