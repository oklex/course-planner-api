import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import checkToken from "../middleware/AuthMiddleware";
import db from "../database/knex";

dotenv.config();
const router = Router();

router.post("/login", (req, res) => {
  try {
    const secretKey = process.env.SECRET_KEY;
    var email: string = req.body.email;
    var password: string = req.body.password;
    const mockEmail: string = "email";
    const mockPassword: string = "password";
    // if the login params fail, then return 401 Unauthorized
    if (email === mockEmail && password === mockPassword) {
      const token = jwt.sign({ email, password }, secretKey);
      console.log("token is: ", token);
      res.json({
        token: token
      });
    } else {
      res.status(401).send("invalid authentication");
    }
  } catch (err) {
    res.status(400).send("bad request", err);
  }
});

router.post("/signup", (req, res) => {
  try {
    var userEmail: string = req.body.email;
    var password: string = req.body.password;
    var newsletter: boolean = req.body.newsletter === "true";
    // if email and password are incomplete, then return an error code 419 MISSING ARGUMENTS
    db("users").insert({
      email: userEmail,
      password: password,
      newsletter: newsletter,
      is_advisor: false
    });
    db.select()
    .from("users")
    .then(rows => {
      res.send(rows);
    })
    // res.send(
    //   userEmail +
    //     "_" +
    //     password +
    //     "_" +
    //     newsletter.toString() +
    //     " this should be an error or success code"
    // );
  } catch (err) {
    res.status(400).send("bad request", err);
  }
});

router.get("/check", checkToken, (req, res) => {
  const decoded = req.decoded;
  const email: string = decoded.email;
  res.json([email, decoded]);
});

export default router;
