const Profesor = require('../models/Profesor');

module.exports.profController = {
  login: async (req, res) => {
    try {
      const { email, contra } = req.body;
      const profesor = await Profesor.findOne({ where: { email, contra } });

      if (profesor) {
        res.json({ success: true, msg: 'Inicio de sesión exitoso' });
      } else {
        res.json({ success: false, msg: 'Credenciales incorrectas' });
      }
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  getProfesor: async (req, res) => {
    try {
      const { email } = req.params;
      const profesor = await Profesor.findOne({ where: { email } });

      if (profesor) {
        res.json(profesor);
      } else {
        res.status(404).json({ error: 'Profesor no encontrado' });
      }
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  getAllProfesores: async (req, res) => {
    try {
      const profesores = await Profesor.findAll();
      res.json(profesores);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },

  createProfesor: async (req, res) => {
    try {
      const {
        profesor_dni,
        nombre,
        apellido_pat,
        apellido_mat,
        fecha_nacimiento,
        telefono,
        email,
        contra,
      } = req.body;

      const nuevoProfesor = await Profesor.create({
        profesor_dni,
        nombre,
        apellido_pat,
        apellido_mat,
        fecha_nacimiento,
        telefono,
        email,
        contra,
      });

      res.json({ msg: 'Profesor registrado correctamente', profesor: nuevoProfesor });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  getCursosByProfesor: async (req, res) => {
    try {
      const { profesor_dni } = req.params;      
      const profesor = await Profesor.findOne({
        where: { profesor_dni }
      });

      if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
      }      
      const cursos = await profesor.getCursos({
          where: { activo: true } 
        }
      );
      res.json(cursos);
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
  updateProfesor: async (req, res) => {
    try {
      const correo = req.params.email;
      const {
        nombre,
        apellido_pat,
        apellido_mat,
        fecha_nacimiento,
        telefono
      } = req.body;
      
      const profesor = await Profesor.findOne({ where: { email: correo } });
      if (!profesor) {
        return res.status(404).json({ error: 'Profesor no encontrado' });
      }      
      profesor.nombre = nombre;
      profesor.apellido_pat = apellido_pat;
      profesor.apellido_mat = apellido_mat;
      profesor.fecha_nacimiento = fecha_nacimiento;
      profesor.telefono = telefono;      
      await profesor.save();

      res.json({ success: true, msg: 'Datos de profesor actualizados correctamente' });
    } catch (error) {
      console.error('Error en el controlador:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  },
};
