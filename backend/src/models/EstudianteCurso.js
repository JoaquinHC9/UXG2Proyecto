// EstudianteCurso.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Curso = require('./Curso');

class EstudianteCurso extends Model {}

EstudianteCurso.init({
  id_est_curso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  estudiante_dni: {
    type: DataTypes.STRING(8),
    allowNull: false,
    references: {
      model: 'Estudiante', 
      key: 'estudiante_dni',
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
  modelName: "EstudianteCurso",  
  freezeTableName: true,
  timestamps: false
  
});

module.exports = EstudianteCurso;
