import { iapiPaths } from "./iapi/iapi.swagger.js";
import { entitySchemas } from "../STRUDAL/entity/entites.swagger.js";

export const swaggerDocument = {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
    title: "ENKEL API Documentation",
    description: "ENKEL API Documentation Description",
    termsOfService: "",
    contact: {
      name: "Aman Dhoot",
    },
    license: {
      name: "GPL-3.0-or-later",
    },
  },
  servers: [
    {
      url: "localhost:3000",
      description: "Local",
    },
    {
      url: "beatthebot.co.uk",
      description: "Production",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: { ...entitySchemas }
  },
  paths: {
    ...iapiPaths,
  },
};
