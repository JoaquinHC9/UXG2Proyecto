const Publicacion = require('../models/Publicacion');
const TipoPublicacion = require('../models/TipoPublicacion');
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
  }
};
