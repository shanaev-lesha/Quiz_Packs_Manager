const knex = require('../knex.js');

const TABLE_NAME = 'question_packs';

class QuestionPackRepository {
    async create(data) {
        const [pack] = await knex(TABLE_NAME)
            .insert(data)
            .returning('*');

        return pack;
    }

    async findById(id) {
        return knex(TABLE_NAME)
            .where({ id })
            .first();
    }

    async findAllByUserId(userId) {
        return knex(TABLE_NAME)
            .where({ user_id: userId });
    }

    async update(id, data) {
        const [updated] = await knex(TABLE_NAME)
            .where({ id })
            .update(data)
            .returning('*');

        return updated;
    }

    async delete(id) {
        return knex(TABLE_NAME)
            .where({ id })
            .del();
    }
}

module.exports = new QuestionPackRepository();