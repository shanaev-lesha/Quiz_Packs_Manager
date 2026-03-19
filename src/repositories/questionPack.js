import knex from '../knex.js';

const TABLE_NAME = 'question_packs';

export async function create(data) {
  const [pack] = await knex(TABLE_NAME)
    .insert(data)
    .returning('*');

  return pack;
}

export async function findById(id) {
  return knex(TABLE_NAME)
    .where({ id })
    .first();
}

export async function findAllByUserId(userId) {
  return knex(TABLE_NAME)
    .where({ user_id: userId });
}

export async function update(id, data) {
  const [updated] = await knex(TABLE_NAME)
    .where({ id })
    .update(data)
    .returning('*');

  return updated;
}

export async function remove(id) {
  return knex(TABLE_NAME)
    .where({ id })
    .del();
}
