exports.up = async knex => {
  return knex.schema.createTable("users", table => {
    table
      .string("email")
      .unique()
      .notNull();
    table.string("password").notNull();
    table.boolean('newsletter');
    table.string('school').notNull()
    table.boolean('is_advisor');
  });
};

exports.down = async knex => {
  await knex.schema.dropTableIfExists("users");
};
