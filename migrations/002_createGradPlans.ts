exports.up = async knex => {
    return knex.schema.createTable("grad_plans", table => {
      table
        .string("plan_id").unique().notNull();
      table.string("department").notNull();
      table.string('plan_name').notNull();
      table.string('starting_semester').notNull();
      table.string('degree_type').notNull();
    });
  };
  
  exports.down = async knex => {
    await knex.schema.dropTableIfExists("grad_plans");
  };