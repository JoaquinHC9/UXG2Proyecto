const sequelize = require('../config/db');
const Publicacion = require('../models/Publicacion');
const Tema = require('../models/Tema');
const Tarea = require('../models/Tarea');

module.exports.publiController = {
  getPublicacionesPorTema: async (req, res) => {
    try {
      const { id_tema } = req.params;
      
      const tema = await Tema.findByPk(id_tema);
      if (!tema) {
        return res.status(404).json({ error: 'Tema no encontrado' });
      }      
      const publicaciones = await Publicacion.findAll({
        where: { id_tema }
      });
      console.log('Publicaciones del Tema', publicaciones);
      res.json(publicaciones);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getPublicacionById: async (req, res) => {
    try {
      const { id_publicacion } = req.params;
      
      const publicacion = await Publicacion.findByPk(id_publicacion);
      if (!publicacion) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }

      res.json(publicacion);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  agregarPublicacion: async (req, res) => {
    const { id_tema } = req.params;
    const {
      titulo,
      contenido,
      url_profesor,
      tipo_publicacion
    } = req.body;
  
    try {
      const nuevaPublicacion = await Publicacion.create({
        titulo,
        contenido,
        fecha_publicacion: new Date(),
        url_profesor,
        tipo_publicacion,
        id_tema
      });
  
      res.status(201).json({ msg: 'Publicación creada correctamente', publicacion: nuevaPublicacion });
    } catch (error) {
      console.error('Error en el controlador:', error);
      return res.status(500).json({ error: 'Error al crear la publicación' });
    }
  },
  
  agregarTarea: async (req, res) => {
    const { id_tema } = req.params;
    const {
      titulo,
      contenido,
      fecha_lim,
      puntos_max,
      url_profesor,
      tipo_publicacion
    } = req.body;
      
    const t = await sequelize.transaction();
  
    try {
      const nuevaPublicacion = await Publicacion.create({
        titulo,
        contenido,
        fecha_publicacion: new Date(),
        url_profesor,
        tipo_publicacion,
        id_tema
      }, { transaction: t });  
      
      const nuevaTarea = await Tarea.create({
        nombre: titulo,        
        fecha_lim,
        puntos_max,
        id_publicacion: nuevaPublicacion.id_publicacion
      }, { transaction: t });
    
      // Confirmamos la transacción
      await t.commit();
  
      res.status(201).json({ msg: 'Tarea creada correctamente', tarea: nuevaTarea });
    } catch (error) {      
      await t.rollback();
  
      console.error('Error en el controlador:', error);
      return res.status(500).json({ error: 'Error al crear la tarea' });
    }
  },
  getPublicacionConTarea: async (req, res) => {
    try {
      const { id_publicacion } = req.params;
      const publicacionConTarea = await Publicacion.findOne({
        where: { id_publicacion },
        include: {
          model: Tarea,
          required: true // Esto asegura que solo se devuelvan las publicaciones que tienen una tarea asociada
        }
      });

      if (!publicacionConTarea) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }

      res.json(publicacionConTarea);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error al obtener la publicación' });
    }
  }
};
