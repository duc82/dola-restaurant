const swaggerJSDoc = require("swagger-jsdoc");

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Dola Restaurant Swagger API",
      version: "1.0.0",
      description: "Tài liệu Dola Restaurant API",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Dola Restaurant",
        url: "https://dola-restaurant.vercel.app",
        email: "duccdht123@gmail.com",
      },
    },

    servers: [
      {
        url: process.env.HOST_SERVER + "/api/v1",
      },
    ],

    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Nhập token JWT để xác thực người dùng",
        },
      },
    },
  },

  apis: ["./routes/*.js"],
});

module.exports = swaggerSpec;
