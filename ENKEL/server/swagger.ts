import { iapiPaths } from "./iapi/iapi.swagger.js";
import { entitySchemas } from "../STRUDAL/entity/entites.swagger.js";
import { EntityApiResponseSchema } from "./iapi/apiResponse.js";
import { LoginResponseSchema } from "./iapi/loginResponse.js";

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
      url: "https://localhost:8080",
      description: "Local (Proxy)",
    },
    {
      url: "http://localhost:3000",
      description: "Local",
    },
    {
      url: "https://beatthebot.co.uk",
      description: "Production",
    },
  ],
  security: {
    bearerAuth: [],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: { ...entitySchemas, ...EntityApiResponseSchema, ...LoginResponseSchema },
  },
  paths: {
    ...iapiPaths,
    "/login": {
      post: {
        tags: ["Login"],
        description: "Login Endpoint to create/retrieve a JWT token for authentication",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserLogin",
              },
            },
          },
        },
        security: {},
        responses: {
          200: {
            description: "Successful Login",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          401: {
            description: "Login failed, likely incorrect email/password",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
        },
      },
    },
    "/login/register": {
      post: {
        tags: ["Login"],
        description: "Register a new Standard user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UserLogin",
              },
            },
          },
        },
        security: {},
        responses: {
          200: {
            description: "Successful Registration",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EntityApiResponse",
                },
              },
            },
          },
          401: {
            description: "Registration Failed",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/EntityApiResponse",
                },
              },
            },
          },
        },
      },
    },
  },
};
