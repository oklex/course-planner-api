import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import checkToken, { AuthMiddleware } from "../middleware/AuthMiddleware";
import db from "../database/knex";
import PlannerMiddleware from "../middleware/PlannerMiddleware";

dotenv.config();
const router = Router();

/* 
REQUEST
  "degree": "BSC SCI",
  "major": "Software Systems",
*/
router.post("/",[AuthMiddleware.checkToken, PlannerMiddleware.validateCreation],
  (req, res) => {
    let degree = req.body.degree;
    let major = req.body.major;
    var decoded = req.decoded;
    var school = decoded.school;
    db("planners")
      .insert({
        degree: degree,
        major: major,
        school: school
      })
      .then(rows => {
        console.log("test POST success!", rows);
        return res.status(200).json({ success: "Updated Successfully" });
      })
      .catch(e => {
        console.log(e.sqlMessage);
        return res.status(400).send(e.sqlMessage);
      });
  }
);

router.get("/all", (req, res) => {
  // APPLY: pagination & search by: school, major, degree type, limit
  db("planners")
    .select()
    .then(rows => {
      console.log(rows);
      return res.json(rows);
    })
    .catch(e => {
      console.log(e.sqlMessage);
      return res.status(400).send(e.sqlMessage);
    });
});

// DEV ONLY
router.delete("/", AuthMiddleware.checkToken, (req, res) => {
  db("planners")
    .del()
    .then(() => {
      return res.status(200).send("all test planners deleted");
    })
    .catch(e => {
      console.log("deleting all planners");
      return res.status(500).send(e.sqlMessage);
    });
});

export default router;
