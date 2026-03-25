import * as service from './service.js';

export async function create(req, res, next) {
  try {
    const result = await service.createPack(req.user.id, req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

export async function getAll(req, res, next) {
  try {
    const result = await service.getUserPacks(req.user.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export async function getById(req, res, next) {
  try {
    const result = await service.getPackById(req.user.id, req.params.id);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export async function update(req, res, next) {
  try {
    const result = await service.updatePack(
      req.user.id,
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export async function remove(req, res, next) {
  try {
    await service.remove(req.user.id, req.params.id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
