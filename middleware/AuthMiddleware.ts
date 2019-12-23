import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()


export const AuthMiddleware = {
  checkToken: async (req, res, next) => {
    let token = req.headers["authorization"];
    const secretKey = process.env.SECRET_KEY;

    if (token) {
      if (token.startsWith("Bearer ")) { token = token.slice(7, token.length); }
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          console.log(token, err)
          return res.status(400).json({
            success: false,
            message: "Token is not valid"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Auth token is not supplied"
      });
    }
  },

  checkSignUpInfo: async (req, res, next) => {
    let email:string = req.body.email
    let password:string = req.body.password
    if (!email.includes('@') || email.length < 5) {
      return res.json({
        success: false,
        message: "email is invalid; please input a correct email"
      })
    } else if (password.length < 8) {
      return res.json({
        success: false,
        message: "password is invalid; please input a valid password"
      })
    } else {
      next()
    }
  },

  checkIfAdvisor: async (req, res, next) => {
    // read from a list of authorized email accounts
    // include an expiry date onto the auth list
  }
}

export default AuthMiddleware;