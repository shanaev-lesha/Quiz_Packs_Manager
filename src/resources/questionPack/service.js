const repository = require('../../repositories/questionPack.js');
const { AppError } = require("../../common/appError.js");

async function createPack(userId, data) {
    return repository.create({
        ...data,
        user_id: userId
    });
}

async function getUserPacks(userId) {
    return repository.findAllByUserId(userId);
}

async function getPackById(userId, packId) {
    const pack = await repository.findById(packId);

    if (!pack) {
        throw new AppError('Pack not found', 404);
    }

    if (pack.user_id !== userId) {
        throw new AppError('Forbidden', 403);
    }

    return pack;
}

async function updatePack(userId, packId, data) {
    const pack = await repository.findById(packId);

    if (!pack) {
        throw new AppError('Pack not found', 404);
    }

    if (pack.user_id !== userId) {
        throw new AppError('Forbidden', 403);
    }

    return repository.update(packId, data);
}

async function deletePack(userId, packId) {
    const pack = await repository.findById(packId);

    if (!pack) {
        throw new AppError('Pack not found', 404);
    }

    if (pack.user_id !== userId) {
        throw new AppError('Forbidden', 403);
    }

    await repository.remove(packId);
}

module.exports = {
    createPack,
    getUserPacks,
    getPackById,
    updatePack,
    deletePack
};