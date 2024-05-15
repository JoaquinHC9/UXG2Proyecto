const Estudiante = require('../models/Estudiante');

module.exports.estController = {
  getEstudiante: async (req, res) => {
    try {
      const { email } = req.params;
      console.log('Email recibido:', email); // Agregar esta línea para verificar el valor de email
      const estudiante = await Estudiante.findOne({ where: { email } });
      console.log('Estudiante encontrado:', estudiante); // Agregar esta línea para verificar el valor de estudiante
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      res.json(estudiante);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getAll: async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll();
      res.json(estudiantes);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  createEstudiante: async (req, res) => {
    try {
      const {
        estudiante_dni,
        nombre,
        apellido_pat,
        apellido_mat,
        fecha_nacimiento,
        telefono,
        email,
        contra,
      } = req.body;
      const nuevoEstudiante = await Estudiante.create({
        estudiante_dni,
        nombre,
        apellido_pat,
        apellido_mat,
        fecha_nacimiento,
        telefono,
        email,
        contra,
      });
      res.json({ msg: 'Estudiante registrado correctamente', estudiante: nuevoEstudiante });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, contra } = req.body;
      const estudiante = await Estudiante.findOne({ where: { email, contra } });
      if (estudiante) {
        res.json({ success: true, msg: 'Inicio de sesión exitoso' });
      } else {
        res.json({ success: false, msg: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  
  getEstudianteByDni: async (req, res) => {
    try {
      const { dni } = req.params;      
      const estudiante = await Estudiante.findOne({ where: { estudiante_dni: dni } });
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      res.json(estudiante);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  
  obtenerCursosPorDNI : async (req, res) => {
    try {
      const { dni: estudiante_dni } = req.params;
      console.log('DNI del estudiante:', estudiante_dni);
  
      // Buscar al estudiante por su DNI
      const estudiante = await Estudiante.findOne({
        where: { estudiante_dni: estudiante_dni }
      });
      
      if (!estudiante) {
        console.log('Estudiante no encontrado');
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
  
      // Obtener los cursos del estudiante
      const estudiantecursos = await estudiante.getCursos();
  
      console.log('Cursos del estudiante:', estudiantecursos);
      return res.json(estudiantecursos);
    } catch (error) {
      console.error('Error en el controlador:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
};
