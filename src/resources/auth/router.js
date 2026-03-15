import { Router } from "express";
import { register, login, me } from "./controller.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { validateBody } from "../../middlewares/validateBody.js";
import { registerBodySchema, loginBodySchema, } from "./validators/httpSchemas.js";

const router = Router();

router.post(
    "/register",
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = 'Регистрация пользователя'
  
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $ref: "#/definitions/RegisterBody"
        }
      }
  
      #swagger.responses[201] = {
        description: "Пользователь создан",
        schema: { $ref: "#/definitions/User" }
      }
    */
    validateBody(registerBodySchema),
    register
);

router.post(
    "/login",
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = 'Авторизация'
  
      #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: {
          $ref: "#/definitions/LoginBody"
        }
      }
  
      #swagger.responses[200] = {
        description: "JWT токен",
        schema: { $ref: "#/definitions/Token" }
      }
    */
    validateBody(loginBodySchema),
    login
);

router.get(
    "/me",
    /*
      #swagger.tags = ['Auth']
      #swagger.summary = 'Текущий пользователь'
      #swagger.security = [{
        "bearerAuth": []
      }]
      #swagger.responses[200] = {
        description: "Данные пользователя"
      }
      #swagger.responses[401] = {
        description: "Не авторизован"
      }
    */
    authMiddleware,
    me
);

export default router;
