// import express
import * as express from "express";
import * as bodyParser from "body-parser";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import checkToken from "./middleware/AuthMiddleware";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// router use for basic get
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", (req, res) => {
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
    res.status(400).send("bad request");
  }
});

app.post("/signup", (req, res) => {
  var userEmail: string = req.body.email;
  var password: string = req.body.password;
  var approvedNewsletter: boolean = req.body.newsletter === "true";
  // if email and password are incomplete, then return an error code 419 MISSING ARGUMENTS
  res.send(
    userEmail +
      "_" +
      password +
      "_" +
      approvedNewsletter.toString() +
      " this should be an error or success code"
  );
});

app.get("/check", checkToken, (req, res) => {
  const decoded = req.decoded;
  const email:string = decoded.email;
  res.json([email, decoded]);
});

app.listen(process.env.PORT || 3001);
