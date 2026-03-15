import swaggerAutogen from "swagger-autogen";
import { schemas } from "./schemas.js";
import { responses } from "./responses.js";

const doc = {
    info: {
        title: "Backend API",
        description: "API проекта"
    },

    host: "localhost:3000",
    schemes: ["http"],

    definitions: schemas,
    responses: responses,

    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Введите: Bearer <JWT>"
        }
    }
};

const outputFile = "./swagger_output.json";

const endpointsFiles = [
    "./src/app.js",
    "./src/resources/auth/router.js",
    "./src/resources/health/router.js"
];

const options = {
    language: "ru"
};

swaggerAutogen(options)(outputFile, endpointsFiles, doc);