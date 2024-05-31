const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Curso extends Model {}

Curso.init({
  id_curso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(255),
  },
  seccion: {
    type: DataTypes.STRING(1),
  },
  horario: {
    type: DataTypes.STRING(50),
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  sequelize,
  modelName: 'curso',
  freezeTableName: true,
  timestamps: false
});

module.exports = Curso;

