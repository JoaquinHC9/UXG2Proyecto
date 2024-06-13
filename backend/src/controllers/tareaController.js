const sequelize = require('../config/db');
const Publicacion = require('../models/Publicacion');
const Estudiante = require('../models/Estudiante');
const EstudianteTarea = require('../models/EstudianteTarea');
const EstudianteCurso = require('../models/EstudianteCurso');
const Tarea = require('../models/Tarea');

module.exports.tareaController = { 
  getTareasPorTema: async (req, res) => {
    try {
      const { id_tema } = req.params;
      const tareas = await Tarea.findAll({
        include: {
          model: Publicacion,
          where: { id_tema, tipo_publicacion: 'tarea' }
        }
      });
      res.json(tareas);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getTareasNoCompletadasPorTema: async (req, res) => {
    try {
      const { id_tema } = req.params;
      const tareasCompletadas = await EstudianteTarea.findAll({
        where: { completado: false },
        include: {
          model: Tarea,
          include: {
            model: Publicacion,
            where: { tipo_publicacion: 'tarea', id_tema }
          }
        }
      });
      res.json(tareasCompletadas);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getTareasCompletadasPorTema: async (req, res) => {
    try {
      const { id_tema } = req.params;
      const tareasCompletadas = await EstudianteTarea.findAll({
        where: { completado: true },
        include: {
          model: Tarea,
          include: {
            model: Publicacion,
            where: { tipo_publicacion: 'tarea', id_tema }
          }
        }
      });
      res.json(tareasCompletadas);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getTareasPorEstudianteYCurso: async (req, res) => {
    try {
      const { id_est, id_curso } = req.params;
      const tareas = await EstudianteTarea.findAll({
        where: { id_est },
        include: {
          model: Tarea,
          include: {
            model: Publicacion,
            where: { tipo_publicacion: 'tarea', id_curso }
          }
        }
      });
      res.json(tareas);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  entregarTarea : async (req, res) => {
    try {
      const {estudiante_dni, id_tarea} = req.params; 
      const {url_entrega } = req.body;
      
      const entregaTarea = await EstudianteTarea.create({
        estudiante_dni,
        id_tarea,
        url_entrega,
        fecha_entrega: new Date(),
        completado: true 
      });
      res.status(201).json({ msg: 'Tarea entregada correctamente', entregaTarea });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error al entregar la tarea' });
    }
  },
  calificarTarea: async (req, res) => {
    try {
      const { estudiante_dni,id_tarea} = req.params;
      const { calificacion } = req.body;      
      const tareaEstudiante = await EstudianteTarea.findOne({
        where: { estudiante_dni: estudiante_dni, id_tarea: id_tarea }
      });

      if (!tareaEstudiante) {
        return res.status(404).json({ error: 'La tarea del estudiante no fue encontrada' });
      }
      
      await tareaEstudiante.update({ calificacion });

      res.json({ msg: 'Tarea calificada correctamente', tarea: tareaEstudiante });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error al calificar la tarea' });
    }
  },
  verificarTareaCompletada: async (req, res) => {
    try {
      const { id_tarea, estudiante_dni } = req.params;      
      const tareaCompletada = await EstudianteTarea.findOne({
        where: { id_tarea, estudiante_dni }
      });
      
      if (tareaCompletada) {
        res.json(tareaCompletada);
      } else {
        res.json({ completado: false });
      }
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  obtenerEstudiantesPorTarea : async (req, res) => {
    const { id_publicacion } = req.params;
    try {        
        const tarea = await Tarea.findOne({
            where: { id_publicacion }
        });

        if (!tarea) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }        
        const estudiantesTarea = await EstudianteTarea.findAll({
            where: { id_tarea: tarea.id_tarea },
            include: [{
                model: Estudiante,
                attributes: ['estudiante_dni', 'nombre', 'apellido_pat', 'apellido_mat', 'email']
            }]
        });

        res.status(200).json(estudiantesTarea);
    } catch (error) {
        console.error('Error en el controlador:', error);
        return res.status(500).json({ error: 'Error al obtener los estudiantes de la tarea' });
    }
  },
  obtenerDetallesTarea: async (req, res) => {
    try {
      const { id_publicacion, id_est_tarea } = req.params;      
      const tareaEntregada = await EstudianteTarea.findByPk(id_est_tarea, {
        include: {
          model: Tarea,
          where: { id_publicacion }
        }
      });

      if (!tareaEntregada) {
        return res.status(404).json({ error: 'No se encontró la tarea entregada' });
      }      
      res.json(tareaEntregada);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
};
