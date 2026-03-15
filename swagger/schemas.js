import j2s from "joi-to-swagger";

import {
    registerBodySchema,
    loginBodySchema
} from "../src/resources/auth/validators/httpSchemas.js";

const { swagger: RegisterBody } = j2s(registerBodySchema);
const { swagger: LoginBody } = j2s(loginBodySchema);

export const schemas = {
    RegisterBody,
    LoginBody,

    User: {
        type: "object",
        properties: {
            id: { type: "string", example: "uuid" },
            email: { type: "string", example: "user@mail.com" },
            created_at: { type: "string", example: "2026-01-01T10:00:00Z" }
        }
    },

    Token: {
        type: "object",
        properties: {
            token: { type: "string", example: "jwt.token.here" }
        }
    }
};