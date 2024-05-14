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

-- Tabla Estudiante_Curso
CREATE TABLE estudiante_curso (
  id_est_curso SERIAL PRIMARY KEY,
  estudiante_dni VARCHAR(8) REFERENCES estudiante(estudiante_dni),
  curso_id INT REFERENCES curso(id_curso)
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

-- Tabla Curso_Profesor
CREATE TABLE curso_profesor (
  id_curso_profesor SERIAL PRIMARY KEY,
  profesor_dni VARCHAR(8) REFERENCES profesor(dni),
  curso_id INT REFERENCES curso(id_curso)
);

-- Tabla Tipo_Evaluacion
CREATE TABLE tipo_evaluacion (
  id_tipo_eva SERIAL PRIMARY KEY,
  nombre VARCHAR(25),
  descripcion VARCHAR(50)
);

-- Tabla Evaluacion
CREATE TABLE evaluacion (
  id_evaluacion SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  descripcion VARCHAR(50),
  fecha_limite DATE, -- Cambié a DATE en lugar de VARCHAR(50) para mayor claridad
  puntuacion_max DECIMAL(10,2),
  eva_tipo INT REFERENCES tipo_evaluacion(id_tipo_eva),
  curso_id INT REFERENCES curso(id_curso) -- Añadí esta columna para la relación con Curso
);

-- Tabla Estudiante_Evaluacion
CREATE TABLE estudiante_evaluacion (
  id_est_eva SERIAL PRIMARY KEY,
  est_dni VARCHAR(8) REFERENCES estudiante(dni),
  eva_id INT REFERENCES evaluacion(id_evaluacion),
  fecha_envio DATE,
  calificacion DECIMAL(10,2),
  comentario TEXT -- Quité la coma al final para evitar errores de sintaxis
);


INSERT INTO estudiante_curso (estudiante_codigo, curso_id)
VALUES 
('13200051', 1),
('15200213', 1),
('15200226', 1),
('16200056', 1),
('16200237', 1),
('16200250', 1),
('17200301', 1),
('18200037', 1),
('18200114', 1),
('19200273', 1),
('20200108', 1),
('20200169', 1),
('20200289', 1),
('21200025', 1),
('21200030', 1),
('21200044', 1),
('21200107', 1),
('21200121', 1),
('21200203', 1),
('21200220', 1),
('21200223', 1),
('21200234', 1),
('21200254', 1),
('21200255', 1),
('21200264', 1),
('21200281', 1),
('21200300', 1),
('22200078', 1);

-- Insert para la tabla profesor
INSERT INTO profesor (dni, nombre, apellido_pat, apellido_mat, telefono, email, contra)
VALUES ('06147737', 'HUGO FROILAN', 'VEGA', 'HUERTA', '951841321', 'hvegah@unmsm.edu.pe', '06147737');

-- Insert para la tabla curso
INSERT INTO curso (nombre, descripcion, dni_profesor)
VALUES ('IHC', 'Interaccion hombre computador', '06147737');