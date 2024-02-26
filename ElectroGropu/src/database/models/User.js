
module.exports = (sequelize, DataTypes) => {
  let alias = "User";
  let cols={
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  username: {
    type: DataTypes.STRING,
    allowNull:false
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull:false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull:false
  },
  rol_id: {
    type: DataTypes.INTEGER
  },
  avatar: {
    type: DataTypes.STRING
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
  tableName: "users",
  timestamps: true
}

const User = sequelize.define(alias,cols,config);

User.associate = models=>{
  User.hasMany(models.Adress,{
    as:"adress",
    foreignKey:"user_id"
  })
  User.hasMany(models.Contact,{
    as:"contact",
    foreignKey:"user_id"
  })
 
  User.belongsTo(models.Rol,{
      as:"rol",
      foreignKey:"user_id"
  })

  User.belongsToMany(models.Product,{
    as:"product",
    through:"cart",
    foreignKey: "user_id",
    otherKey:"product_id",
    timestamps:true
  })
  
}
  return User;
};