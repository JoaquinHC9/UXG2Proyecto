// EstudianteCurso.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Curso = require('./Curso');

class CursoProfesor extends Model {}

CursoProfesor.init({
  id_curso_profesor: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  profesor_dni: {
    type: DataTypes.STRING(8),
    allowNull: false,
    references: {
      model: 'Profesor', 
      key: 'dni',
    },
  },
  id_curso: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Curso', 
      key: 'id_curso',
    },
  },
}, {
  sequelize,
  modelName: "CursoProfesor",  
  freezeTableName: true,
  timestamps: false
  
});

module.exports = CursoProfesor;
