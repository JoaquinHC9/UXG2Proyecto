const Curso = require('./Curso');
const Estudiante = require('./Estudiante');
const EstudianteCurso = require('./EstudianteCurso');

Estudiante.belongsToMany(Curso, {
  through: { model: EstudianteCurso }, // Proporcionar un alias explícito
  foreignKey: 'estudiante_dni',
  otherKey: 'id_curso', 
});

Curso.belongsToMany(Estudiante, { 
  through: { model: EstudianteCurso}, // Proporcionar el mismo alias
  foreignKey: 'id_curso',
  otherKey: 'estudiante_dni'
});
EstudianteCurso.belongsTo(Curso, { foreignKey: 'id_curso' });
EstudianteCurso.belongsTo(Estudiante, { foreignKey: 'estudiante_dni' });