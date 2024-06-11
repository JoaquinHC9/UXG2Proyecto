const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Publicacion extends Model {}
Publicacion.init({
  id_publicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  fecha_publicacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  url_profesor: {
    type: DataTypes.STRING,
    allowNull: true
  },  
  tipo_publicacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
    sequelize,
    modelName: "publicacion",  
    freezeTableName: true,
    timestamps: false    
});

module.exports = Publicacion;
