const EstudianteCurso = require('../models/EstudianteCurso');
const Curso = require('../models/Curso');
const Estudiante = require('../models/Estudiante');
module.exports.estCursoController = {
    obtenerCursosPorDNI : async (req, res) => {
        try {
            const { dni: estudiante_dni } = req.params;
            console.log('DNI del estudiante:', estudiante_dni);        
            const estudianteCursos = await EstudianteCurso.findAll({
                where: { estudiante_dni: estudiante_dni },
                include: [{
                    model: Curso,                
                }],
            });

            if (!estudianteCursos || estudianteCursos.length === 0) {
                console.log('No se encontraron cursos para el estudiante');
                return res.status(404).json({ error: 'No se encontraron cursos para el estudiante' });
            }

            console.log('Cursos del estudiante:', estudianteCursos);
            return res.json(estudianteCursos);
        } catch (error) {
            console.error('Error en el controlador:', error);
            return res.status(500).json({ error: 'Error en el servidor' });
        }
    },
    obtenerEstudiantesPorCurso: async (req,res)=>{
        const { id_curso } = req.params;
        try {
            // Buscar estudiantes asociados al curso
            const estudiantes = await EstudianteCurso.findAll({
            where: { id_curso },
            include: [{ model: Estudiante,
                attributes: ['nombre', 'apellido_pat', 'apellido_mat', 'email']
             }]
            });

            res.status(200).json({ estudiantes });
        } catch (error) {
            console.error('Error en el controlador:', error);
            return res.status(500).json({ error: 'Error al obtener los estudiantes del curso' });
        }        
    }
};

