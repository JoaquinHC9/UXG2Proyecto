-- Tabla Estudiante
CREATE TABLE estudiante (
    estudiante_dni VARCHAR(8) PRIMARY KEY,
    nombre VARCHAR(25),
    apellido_pat VARCHAR(25),
    apellido_mat VARCHAR(25),
    fecha_nacimiento DATE,
    telefono VARCHAR(9),
    email VARCHAR(50) UNIQUE NOT NULL,
    contra VARCHAR(128)
);

-- Tabla Curso
CREATE TABLE curso (
    id_curso SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion VARCHAR(255),
    seccion VARCHAR(1),
    horario VARCHAR(50)
);

-- Tabla Tema
CREATE TABLE tema (
    id_tema SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla CursoTema
CREATE TABLE cursotema (
    id_curso_tema SERIAL PRIMARY KEY,
    id_curso INT REFERENCES curso(id_curso),
    id_tema INT REFERENCES tema(id_tema)
);

-- Tabla EstudianteCurso
CREATE TABLE estudiantecurso (
    id_est_curso SERIAL PRIMARY KEY,
    estudiante_dni VARCHAR(8) REFERENCES estudiante(estudiante_dni),
    id_curso INT REFERENCES curso(id_curso)
);

-- Tabla Profesor
CREATE TABLE profesor (
    profesor_dni VARCHAR(8) PRIMARY KEY,
    nombre VARCHAR(25),
    apellido_pat VARCHAR(25),
    apellido_mat VARCHAR(25),
    fecha_nacimiento DATE,
    telefono VARCHAR(9),
    email VARCHAR(50) UNIQUE NOT NULL,
    contra VARCHAR(128)
);

-- Tabla CursoProfesor
CREATE TABLE cursoprofesor (
    id_curso_profesor SERIAL PRIMARY KEY,
    profesor_dni VARCHAR(8) REFERENCES profesor(profesor_dni),
    id_curso INT REFERENCES curso(id_curso)
);

-- Tabla Publicacion (superclase)
CREATE TABLE publicacion (
    id_publicacion SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT,
    fecha_publicacion TIMESTAMP with time zone,
    url_profesor VARCHAR(255),
    tipo_publicacion VARCHAR(50), /* 'general', 'tarea', etc. */
    id_tema INT NOT NULL,
    comentario TEXT,
    FOREIGN KEY (id_tema) REFERENCES tema(id_tema)
);

-- Tabla Tarea (especializacion de Publicacion)
CREATE TABLE tarea (
    id_tarea SERIAL PRIMARY KEY,
    id_publicacion INT UNIQUE REFERENCES publicacion(id_publicacion),
    fecha_lim TIMESTAMP NOT NULL,
    puntos_max INT NOT NULL,
);

-- Tabla EstudianteTarea
CREATE TABLE estudiantetarea (
    id_est_tarea SERIAL PRIMARY KEY,
    estudiante_dni VARCHAR(8) REFERENCES estudiante(estudiante_dni),
    id_tarea INT REFERENCES tarea(id_tarea),
    url_entrega VARCHAR(255),
    fecha_entrega TIMESTAMP, 
    calificacion INT,
    completado BOOLEAN
);

INSERT INTO estudiante (estudiante_dni, nombre, apellido_pat, apellido_mat, fecha_nacimiento, telefono, email, contra)
VALUES ('72270862', 'Joaquin Enrique', 'Hidalgo', 'Cock', '1998-09-19', '932769482', 'joaquin.hidalgo@unmsm.edu.pe', 'contra123');


INSERT INTO curso (id_curso, nombre, descripcion, seccion, horario) VALUES
(1, 'Algoritmica I', 'Fundamentos de la programacion.', 'A', 'Lunes y Miércoles 8:00 - 10:00'),
(2, 'Algoritmica II', 'Desarrollo de software orientado a objetos.', 'A', 'Martes y Jueves 10:00 - 12:00'),
(3, 'Calidad de Software', 'Gestión de la calidad en el desarrollo de software.', 'A', 'Miércoles 14:00 - 16:00');

INSERT INTO EstudianteCurso (id_est_curso, estudiante_dni, curso_id) VALUES
(1, '72270862', 2),
(2, '72270862', 3);

INSERT INTO Tema (nombre) VALUES
('S1-Introducción a la programación orientada a objetos'),
('S2-Encapsulamiento y abstracción'),
('S3-Herencia y polimorfismo'),
('S4-Patrones de diseño');

INSERT INTO Tema (id_curso, nombre) VALUES
('S1-Principios de calidad de software'),
('S2-Procesos de aseguramiento de calidad'),
('S3-Modelos de calidad');

INSERT INTO CursoTema (id_curso, id_tema) VALUES
(2, 1),
(2, 2),
(2, 3),
(2, 4);

INSERT INTO CursoTema (id_curso, id_tema) VALUES
(3, 5),
(3, 6),
(3, 7);


INSERT INTO Publicacion (titulo, contenido, fecha_publicacion, url_profesor, url_alumno, tipo_publicacion_id, completado,id_tema) 
VALUES ('Introducción a la programación orientada a objetos', 'En esta publicación se introduce el concepto de programación orientada a objetos y sus fundamentos.', CURRENT_TIMESTAMP, 'https://drive.google.com/file/d/1bLKOlRKXk9G9j0HU6_ay29ZOY3O_ctww/preview', NULL, 4, 'A',1);

INSERT INTO Publicacion (titulo, contenido, fecha_publicacion, url_profesor, url_alumno, tipo_publicacion_id, completado, id_tema) 
VALUES ('Lectura de Programación Orientada a Objetos', 'Material de lectura en formato PDF sobre los conceptos básicos de la programación orientada a objetos.', CURRENT_TIMESTAMP, 'https://drive.google.com/file/d/1JedHVyqQyJMqCAazSnzytn2sWq-BoGjy/preview', NULL, 4, 'A', 1);


INSERT INTO Publicacion (titulo, contenido, fecha_publicacion, url_profesor, url_alumno, tipo_publicacion_id, completado, id_tema) 
VALUES ('Material de Clase sobre POO', 'Material de clase comprimido en formato RAR con archivos relacionados con la programación orientada a objetos.', CURRENT_TIMESTAMP, 'https://drive.google.com/file/d/1E1nDSLjmXuEYqm_6Yo33dM1VBdiIlqaF/preview', NULL, 4, 'N', 1);
