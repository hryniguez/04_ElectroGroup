module.exports = (sequelize, DataTypes) => {
  let alias = "Contact";
  let cols = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  phone: {
    type: DataTypes.INTEGER
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  opcional_number: {
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
  tableName:"contact",
  timestamps:true
};
const Contact = sequelize.define(alias,cols,config);

Contact.associate = models =>{
  Contact.belongsTo(models.User,{
    as:"userContact",
    foreignKey:"user_id"
  })
}
  return Contact;
};