
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class TipoPublicacion extends Model {}
TipoPublicacion.init({
  id_tipo_publicacion: {
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
    modelName: "tipopublicacion",  
    freezeTableName: true,
    timestamps: false    
});

module.exports = TipoPublicacion;
