import { Router } from "express";
import { healthCheck } from "./controller.js";

const router = Router();


router.get("/health", healthCheck
    /*
  #swagger.tags = ['Health']
  #swagger.summary = 'Проверка состояния сервера'
  #swagger.responses[200] = {
    description: 'Endpoint проверяет работает ли сервер'
  }
*/
);


export default router;
