import * as knex from "knex";
import * as dotenv from "dotenv";

dotenv.config();

const db = knex({
  client: "mysql",
  connection: {
      host : process.env.DATABASE_HOST,
      user : process.env.DATABASE_USER,
      password : process.env.DATABASE_PASSWORD,
      database : process.env.DATABASE_NAME
    }
});

export default db;