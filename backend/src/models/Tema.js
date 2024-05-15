const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Tema extends Model {}

Tema.init({
  id_tema: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    sequelize,
    modelName: "tema",  
    freezeTableName: true,
    timestamps: false    
});

module.exports = Tema;
