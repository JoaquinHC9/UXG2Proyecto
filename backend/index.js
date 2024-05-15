// index.js
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());

const sequelize = require('./src/config/db');
require('./src/models/Estudiante');
require('./src/models/Curso');
require('./src/models/EstudianteCurso');
require('./src/models/Relations'); 

const estRoutes = require('./src/routes/estRoutes');
const profRoutes = require('./src/routes/profRoutes');
const estCursoRoutes = require('./src/routes/estCursoRoutes');
const cursoRoutes = require('./src/routes/cursoRoutes');
const publiRoutes = require('./src/routes/publiRoutes');

app.use('/estudiantes', estRoutes);
app.use('/profesores', profRoutes);
app.use('/cursos', cursoRoutes);
app.use('/estCurso', estCursoRoutes);
app.use('/publicaciones',publiRoutes);

const port = process.env.PORT;

sequelize.sync() // Esto sincronizará los modelos con la base de datos
  .then(() => {
    app.listen(port, () => {
      console.log(`Escuchando en el puerto ${port}`);
      console.clear()
    });
  })
  .catch(err => {
    console.error('Error al sincronizar con la base de datos:', err);
  });
