/** @param { import("knex").Knex } knex */
export async function up(knex) {
    // 1. Создаём таблицу
    await knex.schema.createTable("question_packs", (table) => {
        table.increments("id").primary();

        table
            .integer("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

        table.string("title").notNullable();
        table.text("description").nullable();

        table.string("status").notNullable().defaultTo("draft");

        table.timestamps(true, true);

        table.index(["user_id"], "idx_question_packs_user_id");
    });


    await knex.raw(`
    ALTER TABLE question_packs
    ADD CONSTRAINT question_packs_status_check
    CHECK (status IN ('draft', 'published'))
  `);
}

/** @param { import("knex").Knex } knex */
export async function down(knex) {
    await knex.schema.dropTableIfExists("question_packs");
}
