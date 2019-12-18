import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import AuthMiddleware from "../middleware/AuthMiddleware";
import db from "../database/knex";

dotenv.config();
const router = Router();

router.post("/login", async (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  var email: string = req.body.email;
  var password: string = req.body.password;
  var truePassword: string = ''
  await db('users')
    .where({ email: email })
    .then(rows => {
      truePassword = rows[0].password;
      console.log(truePassword)
    })
    .catch((e) => {
      return res.status(400).send("email not registered; user must create an account")
    });
  if (password === truePassword) {
    const token = jwt.sign({ email, password }, secretKey);
    console.log("token is: ", token);
    return res.json({
      token: token
    });
  } else {
    return res.status(401).send("invalid authentication");
  }
});

router.post("/signup", AuthMiddleware.checkSignUpInfo, async (req, res) => {
  const userEmail: string = req.body.email;
  const password: string = req.body.password;
  const newsletter: boolean = req.body.newsletter === "true"
  db.insert({
    email: userEmail,
    password: password,
    newsletter: newsletter,
    is_advisor: false
  })
    .into("users")
    .then(() => {
      console.log('sign-up complete');
      return res.send("sign-up complete")
    })
    .catch((e) => {
      console.log(e.sqlMessage)
      return res.status(400).send(e.sqlMessage);
    })
});

router.get("/check", AuthMiddleware.checkToken, (req, res) => {
  try {
    const decoded = req.decoded;
    res.json(decoded);
  } catch (err) {
    res.status(400).send("bad request", err);
  }
});

//dev only
router.patch('/delete', (req, res) => {
  db('users').del().catch((e) => {
    console.log('deleting all users')
    return res.status(500).send(e.sqlMessage)
  })
  return res.status(200).send("all test users deleted")
})

export default router;