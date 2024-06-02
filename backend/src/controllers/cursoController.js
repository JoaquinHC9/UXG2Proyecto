const Curso = require('../models/Curso');
const CursoProfesor = require('../models/CursoProfesor');
const EstudianteCurso = require('../models/EstudianteCurso');
const CursoTema = require('../models/CursoTema');
const Tema = require('../models/Tema');
const Estudiante = require('../models/Estudiante');
module.exports.cursoController = {
  getTemasPorCurso: async (req, res) => {
    try {
      const { id_curso } = req.params;
      
      const curso = await Curso.findByPk(id_curso);
      if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });
      }      
      const temasCursos = await curso.getTemas();
      console.log('Temas del curso', temasCursos);
      res.json(temasCursos);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getCursoPorId: async(req,res)=>{
    try {
      const { id_curso } = req.params;
      const curso = await Curso.findByPk(id_curso);
      if (!curso) {
        return res.status(404).json({ error: 'Curso no encontrado' });        
      }
      res.json(curso);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  createCurso: async (req, res) => {
    const { nombre, descripcion, seccion, horario, profesor_dni } = req.body;

    try {
      // Iniciar una transacción
      const result = await Curso.sequelize.transaction(async (t) => {
        // Crear el curso en la base de datos
        const nuevoCurso = await Curso.create({
          nombre,
          descripcion,
          seccion,
          horario,
          activo: true
        }, { transaction: t });

        // Crear la entrada en la tabla CursoProfesor para asociar el curso con el profesor
        await CursoProfesor.create({
          profesor_dni: profesor_dni,
          id_curso: nuevoCurso.id_curso
        }, { transaction: t });

        return nuevoCurso;
      });

      res.json({ msg: 'Curso creado correctamente y asociado al profesor', curso: result });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  deleteCurso: async (req, res) => {
    const { id } = req.params;

    try {      
      await sequelize.transaction(async (t) => {        
        const resultado = await Curso.update(
          { activo: false },
          { where: { id_curso: id }, transaction: t }
        );

        if (!resultado[0]) {
          return res.status(404).json({ error: 'Curso no encontrado' });
        }

        res.json({ msg: 'Curso marcado como inactivo correctamente' });
      });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  updateCurso: async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, seccion, horario } = req.body;

    try {
        const curso = await Curso.findByPk(id);

        if (!curso) {
            return res.status(404).json({ error: 'Curso no encontrado' });
        }        
        curso.nombre = nombre;
        curso.descripcion = descripcion;
        curso.seccion = seccion;
        curso.horario = horario;        
        await curso.save();
        return res.json({ msg: 'Curso actualizado correctamente', curso });
    } catch (error) {
        console.error('Error en el controlador:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  agregarTema: async (req,res)=>{
    const {id_curso} = req.params;
    const {nombre} = req.body;
    try {      
      const result = await Tema.sequelize.transaction(async (t) => {        
        const nuevoTema = await Tema.create({   
          nombre       
        }, { transaction: t });
        await CursoTema.create({
          id_curso: id_curso,
          id_tema: nuevoTema.id_tema
        }, { transaction: t });
        return nuevoTema;
      });
      res.json({ msg: 'Curso creado correctamente y asociado al profesor', tema: result });
    }catch (error){
      console.error('Error en el controlador:', error);
      return res.status(500).json({error: 'Error al crear el tema'});
    }
  },
  agregarEstudiante: async (req,res)=>{
    const { id_curso } = req.params;
    const { email } = req.body;
    try{
      const curso = await Curso.findByPk(id_curso);
      if (!curso) {
        return res.status(404).json({ error: 'El curso no existe' });
      }
      const estudiante = await Estudiante.findOne({ where: { email } });
      if (!estudiante) {
        return res.status(404).json({ error: 'El estudiante no existe' });
      }
      const estudianteCursoExistente = await EstudianteCurso.findOne({
        where: {
          estudiante_dni: estudiante.estudiante_dni,
          id_curso: id_curso
        }
      });
  
      if (estudianteCursoExistente) {
        return res.status(400).json({ error: 'El estudiante ya está asociado a este curso' });
      }
      const nuevaAsociacion = await EstudianteCurso.create({
        estudiante_dni: estudiante.estudiante_dni,
        id_curso: id_curso
      });
      res.status(201).json({ msg: 'Estudiante agregado al curso correctamente', estudianteCurso: nuevaAsociacion });
    }catch (error){
      console.error('Error en el controlador:', error);
      return res.status(500).json({ error: 'Error al agregar el estudiante al curso' });
    }
  }
};
