const repository = require('../../repositories/questionPack.js');
import { AppError } from "../../common/appError.js";

class QuestionPackService {

    async createPack(userId, data) {
        return repository.create({
            ...data,
            user_id: userId
        });
    }

    async getUserPacks(userId) {
        return repository.findAllByUserId(userId);
    }

    async getPackById(userId, packId) {
        const pack = await repository.findById(packId);
        if (!pack) {
            throw new AppError('Pack not found', 404);
        }
        if (pack.user_id !== userId) {
            throw new AppError('Forbidden', 403);
        }
        return pack;
    }

    async updatePack(userId, packId, data) {
        const pack = await repository.findById(packId);
        if (!pack) {
            throw new AppError('Pack not found', 404);
        }
        if (pack.user_id !== userId) {
            throw new AppError('Forbidden', 403);
        }
        return repository.update(packId, data);
    }

    async deletePack(userId, packId) {
        const pack = await repository.findById(packId);
        if (!pack) {
            throw new AppError('Pack not found', 404);
        }
        if (pack.user_id !== userId) {
            throw new AppError('Forbidden', 403);
        }
        await repository.delete(packId);
    }
}

module.exports = new QuestionPackService();