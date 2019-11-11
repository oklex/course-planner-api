import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import checkToken from "../middleware/AuthMiddleware";
import db from "../database/knex";
import hashPassword from "../utils/hashPassword";

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

router.post("/signup", async (req, res) => {
  try {
    const userEmail: string = req.body.email;
    const password: string = req.body.password;
    const newsletter: boolean = req.body.newsletter === "true";
    var hashedPassword = await hashPassword(password, userEmail)
    // if email and password are incomplete, then return an error code 419 MISSING ARGUMENTS
    db.insert({
      email: userEmail,
      password: hashedPassword,
      newsletter: newsletter,
      is_advisor: false
    })
      .into("users")
      .then(() => res.end());

    // only for testing
    // db.select()
    // .from("users")
    // .then(rows => {
    //   res.send(rows);
    // })
  } catch (err) {
    res.status(400).send("bad request", err);
  }
});

router.get("/check", checkToken, (req, res) => {
  try {
    const decoded = req.decoded;
    const email: string = decoded.email;
    res.json([email, decoded]);
  } catch (err) {
    res.status(400).send("bad request", err);
  }
});

export default router;