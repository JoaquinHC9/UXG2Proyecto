const sequelize = require('../config/db');
const Publicacion = require('../models/Publicacion');
const Estudiante = require('../models/Estudiante');
const EstudianteTarea = require('../models/EstudianteTarea');
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
  }

};
