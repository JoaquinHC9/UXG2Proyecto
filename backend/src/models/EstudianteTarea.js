const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class EstudianteTarea extends Model {}
EstudianteTarea.init({
  id_est_tarea: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estudiante_dni: {
    type: DataTypes.STRING(8),
    references: {
      model: 'Estudiante',
      key: 'estudiante_dni'
    }
  },
  id_tarea: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Tarea',
      key: 'id_tarea'
    }
  },
  url_entrega: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha_entrega: {
    type: DataTypes.DATE,
    allowNull: true
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  completado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  modelName: "Estudiantetarea",
  freezeTableName: true,
  timestamps: false
});

module.exports = EstudianteTarea;
