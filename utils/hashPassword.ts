import * as dotenv from "dotenv";
dotenv.config();
const bcrypt = require("bcrypt");

export const hashPassword = async (rawPassword: string, emailSalt: string) => {
  await bcrypt.hash(rawPassword, emailSalt, async (err, hash) => {
    if(err) throw err;
    console.log('hashing password', hash)
    return hash;
  });
  return 0;
};

export default hashPassword