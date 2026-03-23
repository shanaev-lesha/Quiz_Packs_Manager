import { Router } from 'express';
import * as controller from './controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { createPackSchema } from './validators/httpSchemas.js';

const router = Router();

router.use(authMiddleware);

router.post(
  '/',
  /*
    #swagger.tags = ['Question Packs']
    #swagger.summary = 'Создать пак вопросов'

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        $ref: "#/definitions/CreateQuestionPackRequest"
      }
    }

    #swagger.responses[201] = {
      description: "Пак создан",
      schema: { $ref: "#/definitions/QuestionPack" }
    }

    #swagger.responses[401] = {
      description: "Не авторизован"
    }
  */
  validateBody(createPackSchema),
  controller.create
);
router.get(
  '/',
  /*
    #swagger.tags = ['Question Packs']
    #swagger.summary = 'Получить все паки пользователя'

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[200] = {
      description: "Список паков",
      schema: [
  { $ref: "#/definitions/QuestionPack" }
]
    }
  */
  controller.getAll
);
router.get(
  '/:id',
  /*
    #swagger.tags = ['Question Packs']
    #swagger.summary = 'Получить пак по ID'

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[200] = {
      description: "Пак",
      schema: { $ref: "#/definitions/QuestionPack" }
    }

    #swagger.responses[404] = {
      description: "Не найден"
    }
  */
  controller.getById
);
router.put(
  '/:id',
  /*
    #swagger.tags = ['Question Packs']
    #swagger.summary = 'Обновить пак'

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.parameters['body'] = {
      in: 'body',
      schema: {
        $ref: "#/definitions/UpdateQuestionPackRequest"
      }
    }

    #swagger.responses[200] = {
      description: "Обновлённый пак",
      schema: { $ref: "#/definitions/QuestionPack" }
    }
  */
  controller.update
);
router.delete(
  '/:id',
  /*
    #swagger.tags = ['Question Packs']
    #swagger.summary = 'Удалить пак'

    #swagger.security = [{
      "bearerAuth": []
    }]

    #swagger.responses[204] = {
      description: "Удалено"
    }
  */
  controller.remove
);

export default router;
