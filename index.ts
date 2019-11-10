const express = require('express')
const bodyParser = require("body-parser")
import * as dotenv from "dotenv";
import apiRoute from "./routers";
import knex from './database/knex'

dotenv.config();

const app = express();
app.set("port", process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/api", apiRoute);

// router use for basic get
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT || 3001);
knex.migrate.latest()