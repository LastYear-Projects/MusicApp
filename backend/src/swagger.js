const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "MoozikApp API",
      version: "1.0.0",
      description: "A simple Music App Application",
    },
    servers: [
      {
        url: "http://localhost:6969",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
