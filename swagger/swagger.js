import swaggerAutogen from "swagger-autogen";
import { responses } from "./responses.js";
import { schemas } from "./schemas.js";

const doc = {
    info: {
        title: "Backend API",
        description: "API проекта"
    },

    host: "localhost:3000",
    schemes: ["http"],

    definitions: schemas,

    securityDefinitions: {
        bearerAuth: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description: "Bearer <JWT>"
        }
    },

    responses
};

const outputFile = "./swagger_output.json";

const endpointsFiles = [
    "./src/app.js"
];

const options = {
    language: "ru"
};

swaggerAutogen(options)(outputFile, endpointsFiles, doc);