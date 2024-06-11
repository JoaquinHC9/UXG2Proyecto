const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Tarea extends Model {}
Tarea.init({
  id_tarea: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha_lim: {
    type: DataTypes.DATE,
    allowNull: false
  },
  puntos_max: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_publicacion: {
    type: DataTypes.INTEGER,
    references: {
      model: 'publicacion',
      key: 'id_publicacion'
    }
  }
}, {
  sequelize,
  modelName: "tarea",
  freezeTableName: true,
  timestamps: false
});

module.exports = Tarea;
