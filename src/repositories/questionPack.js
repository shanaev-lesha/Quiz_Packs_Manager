const knex = require('../knex.js');

const TABLE_NAME = 'question_packs';

async function create(data) {
    const [pack] = await knex(TABLE_NAME)
        .insert(data)
        .returning('*');

    return pack;
}

async function findById(id) {
    return knex(TABLE_NAME)
        .where({ id })
        .first();
}

async function findAllByUserId(userId) {
    return knex(TABLE_NAME)
        .where({ user_id: userId });
}

async function update(id, data) {
    const [updated] = await knex(TABLE_NAME)
        .where({ id })
        .update(data)
        .returning('*');

    return updated;
}

async function remove(id) {
    return knex(TABLE_NAME)
        .where({ id })
        .del();
}

module.exports = {
    create,
    findById,
    findAllByUserId,
    update,
    remove
};