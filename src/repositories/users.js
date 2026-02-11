import db from '../../knex.js';


export function findByEmail(email) {
    return db('users').where({ email }).first();
}

export function findById(id) {
    return db('users').where({ id }).first();
}

export async function create({ email, password_hash }) {
    const [user] = await db('users')
        .insert({ email, password_hash })
        .returning(['id', 'email', 'created_at']);
    return user;
}




