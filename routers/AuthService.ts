import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import AuthMiddleware from "../middleware/AuthMiddleware";
import db from "../database/knex";
import { getSchoolID } from "../utils/getSchoolCode";

dotenv.config();
const router = Router();

router.post("/login", async (req, res) => {
  const secretKey = process.env.SECRET_KEY;
  var email: string = req.body.email;
  var inputPassword: string = req.body.password;
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
  if (inputPassword === truePassword) {
  var school = getSchoolID(email)
    const token = jwt.sign({ email, school}, secretKey);
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
  const secretKey = process.env.SECRET_KEY;
  db.insert({
    email: userEmail,
    password: password,
    newsletter: newsletter,
    school: getSchoolID(userEmail),
    is_advisor: false
  })
    .into("users")
    .then(() => {
      console.log('sign-up complete');
      var school = getSchoolID(userEmail)
    const token = jwt.sign({ userEmail, school}, secretKey);
    console.log("token is: ", token);
    return res.json({
      token: token
    });
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

router.get('/', (req, res) => {
  db('users').then(rows => res.send(rows)).catch((e)=>res.status(400).end())
})

// //dev only
// router.delete('/', (req, res) => {
//   db('users').del().then(() => {
//   return res.status(200).send("all test users deleted")
//   }).catch((e) => {
//     console.log('deleting all users')
//     return res.status(500).send(e.sqlMessage)
//   })
// })

export default router;