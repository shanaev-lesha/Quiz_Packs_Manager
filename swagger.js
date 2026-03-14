import swaggerAutogen from "swagger-autogen";
const outputFile = './swagger_output.json';
const endpointsFiles = ["./src/resources/auth/router.js",
    "./src/resources/health/router.js"];
const options = {
    language: "ru"
};
swaggerAutogen(options)(outputFile, endpointsFiles);