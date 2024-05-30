// Estudiante.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

class Profesor extends Model {}

Profesor.init({
    profesor_dni: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
    },
    nombre: {
    type: DataTypes.STRING,
    allowNull: false
    },
    apellido_pat: {
    type: DataTypes.STRING,
    allowNull: false
    },
    apellido_mat: {
    type: DataTypes.STRING,
    allowNull: false
    },
    fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false
    },
    telefono: {
    type: DataTypes.STRING,
    allowNull: false
    },
    email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    contra: {
    type: DataTypes.STRING,
    allowNull: false
    }
}, {
  sequelize,
  modelName: "profesor",
  timestamps: false,
  freezeTableName: true  
});

module.exports = Profesor;

