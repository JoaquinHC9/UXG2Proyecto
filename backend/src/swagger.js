const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "UX Proyecto_01",
      version: "1.0.0",
      description:
        "API de administración de cursos y notas del curso de UX",
    },
  },
  apis: ["src/routes/*.js"],
  showCommonExtensions: false,
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
