const Curso = require('../models/Curso');

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
  }
};
