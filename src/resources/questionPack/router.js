import { Router } from 'express';
import * as controller from './controller.js';
import { authMiddleware } from '../../middlewares/authMiddleware.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { createPackSchema } from './validators/httpSchemas.js';

const router = Router();

router.use(authMiddleware);

router.post(
  '/',
  validateBody(createPackSchema),
  controller.create
);
router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

export default router;
