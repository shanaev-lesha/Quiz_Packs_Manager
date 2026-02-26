/** @param { import("knex").Knex } knex */
export async function up(knex) {

    await knex.schema.createTable("question_packs", (table) => {
        table.uuid("id").primary();

        table
            .uuid("user_id")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");

        table.string("title").notNullable();

        table.text("description").nullable();

        table
            .string("status")
            .notNullable()
            .checkIn(["draft", "published"])
            .defaultTo("draft");

        table.timestamps(true, true);

        table.index(["user_id"], "idx_question_packs_user_id");
    });
}

/** @param { import("knex").Knex } knex */
export async function down(knex) {
    await knex.schema.dropTableIfExists("question_packs");
}
