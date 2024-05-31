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
  url_alumno: {
    type: DataTypes.STRING,
    allowNull: true
  },
  completado: {
    type: DataTypes.CHAR(1),
    allowNull: false,
    defaultValue: 'N'
  },
  tipo_publicacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
    sequelize,
    modelName: "publicacion",  
    freezeTableName: true,
    timestamps: false    
});

module.exports = Publicacion;
