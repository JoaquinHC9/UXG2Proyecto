const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class CursoTema extends Model {}

CursoTema.init({
  id_curso_tema: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },  
  id_curso: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Curso',
      key: 'id_curso'
    }
  },  
  id_tema: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Tema',
      key: 'id_tema'
    }
  }
}, {
    sequelize,
    modelName: "CursoTema",  
    freezeTableName: true,
    timestamps: false    
});

module.exports = CursoTema;
