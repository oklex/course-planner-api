import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config()

let checkToken = (req, res, next) => {
  let token = req.headers["authorization"];
  const secretKey = process.env.SECRET_KEY;

  if (token) {
    if (token.startsWith("Bearer ")) token = token.slice(7, token.length);
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: "Token is not valid"
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied"
    });
  } 
};

export default checkToken;
