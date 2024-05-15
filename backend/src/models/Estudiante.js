// Estudiante.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Estudiante extends Model {}

Estudiante.init({
  estudiante_dni: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    field: 'estudiante_dni',
  },
  nombre: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  apellido_pat: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  apellido_mat: {
    type: DataTypes.STRING(25),
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING(9),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  contra: {
    type: DataTypes.STRING(128),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: "estudiante",
  timestamps: false,
  freezeTableName: true  
});

module.exports = Estudiante;

