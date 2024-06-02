const sequelize = require('../config/db');
const Publicacion = require('../models/Publicacion');
const Tema = require('../models/Tema');

module.exports.publiController = {
  getPublicacionesPorTema: async (req, res) => {
    try {
      const { id_tema } = req.params;
      
      const tema = await Tema.findByPk(id_tema);
      if (!tema) {
        return res.status(404).json({ error: 'Tema no encontrado' });
      }      
      const publicaciones = await tema.getPublicacions();
      console.log('Publicaciones del Tema', publicaciones);
      res.json(publicaciones);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getPublicacionById: async (req, res) => {
    try {
      const {id_publicacion } = req.params;
      
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
  agregarPublicacion: async (req,res)=>{
    const {id_tema}=req.params;
    const {
      titulo,
      contenido,      
      url_profesor,
      tipo_publicacion,
      completado,
    } = req.body;
    try{
      const nuevaPublicacion = await Publicacion.create({
        titulo,
        contenido,
        fecha_publicacion: new Date(),
        url_profesor,
        tipo_publicacion,
        completado,
        id_tema
       });
       res.status(201).json({ msg: 'Publicación creada correctamente', publicacion: nuevaPublicacion });
    } catch (error){
      console.error('Error en el controlador:', error);
      return res.status(500).json({ error: 'Error al crear la publicación' });
    }
  }
};
