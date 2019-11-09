exports.up = async knex => {
  return knex.schema.createTable("users", table => {
    table
      .increments("user_id")
      .unsigned()
      .primary();
    table
      .string("email")
      .unique()
      .notNull();
    table.string("password").notNull();
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("users");
};
