module.exports = (sequelize, DataTypes) => {
  let alias  = "Product";
  let cols = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  titulo:{
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.INTEGER
  },
  
  
  brand_id: {
    type: DataTypes.INTEGER
  },
  description_id: {
    type: DataTypes.INTEGER
  },
  
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
};
let config = {
  tableName:"products",
  timestamps:true
};

const Product = sequelize.define(alias,cols,config);
Product.associate = models =>{
  Product.belongsTo(models.Brand,{
    as:"brands",
    foreignKey:"brand_id"
  })
  Product.belongsToMany(models.User,{
    as:"user",
    through:"cart",
    foreignKey: "product_id",
    otherKey:"user_id",
    timestamps:true
  })
  Product.hasOne(models.Description,{
    as:"description",
    foreignKey:"description_id"
  })
  Product.hasMany(models.Image,{
    as:"Images",
    foreignKey:"product_id"
  })
}
  return Product;
};