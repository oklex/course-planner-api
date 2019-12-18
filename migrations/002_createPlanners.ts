exports.up = async knex => {
    return knex.schema.createTable("planners", table => {
      table
        .primary(['degree', 'major']).notNull();
      table.string("degree").notNull();
      table.string('major').notNull();
    });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists("planners");
  };