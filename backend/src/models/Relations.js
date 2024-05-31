//relation.js
const Curso = require('./Curso');
const CursoTema = require('./CursoTema');
const Estudiante = require('./Estudiante');
const EstudianteCurso = require('./EstudianteCurso');
const Publicacion = require('./Publicacion');
const Tema = require('./Tema');
const TipoPublicacion = require('./TipoPublicacion');
const Profesor= require('./Profesor');
const CursoProfesor = require('./CursoProfesor');

Estudiante.belongsToMany(Curso, {
  through: { model: EstudianteCurso }, 
  foreignKey: 'estudiante_dni',
  otherKey: 'id_curso', 
});

Curso.belongsToMany(Estudiante, { 
  through: { model: EstudianteCurso}, 
  foreignKey: 'id_curso',
  otherKey: 'estudiante_dni'
});


Curso.belongsToMany(Tema, {
  through: CursoTema,
  foreignKey: 'id_curso',
  otherKey: 'id_tema'
});

Tema.belongsToMany(Curso, {
  through: CursoTema,
  foreignKey: 'id_tema',
  otherKey: 'id_curso'
});
EstudianteCurso.belongsTo(Curso, { foreignKey: 'id_curso' });
EstudianteCurso.belongsTo(Estudiante, { foreignKey: 'estudiante_dni' });

CursoTema.belongsTo(Curso,{foreignKey:'id_curso'});
CursoTema.belongsTo(Tema,{foreignKey:'id_tema'});

Tema.hasMany(Publicacion,{foreignKey:'id_tema'});
Publicacion.belongsTo(Tema, { foreignKey: 'id_tema' });

Profesor.belongsToMany(Curso, {
  through: { model: CursoProfesor }, 
  foreignKey: 'profesor_dni',
  otherKey: 'id_curso', 
});

Curso.belongsToMany(Profesor, { 
  through: { model: CursoProfesor}, 
  foreignKey: 'id_curso',
  otherKey: 'profesor_dni'
});
CursoProfesor.belongsTo(Curso, { foreignKey: 'id_curso' });
CursoProfesor.belongsTo(Profesor, { foreignKey: 'profesor_dni' });