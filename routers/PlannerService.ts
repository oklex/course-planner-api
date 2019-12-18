import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import checkToken from "../middleware/AuthMiddleware";
import db from "../database/knex";
import PlannerMiddleware from "../middleware/PlannerMiddleware";

dotenv.config();
const router = Router();

// create a new planner
router.post('/', PlannerMiddleware.validateCreation, (req, res) => {
    console.log('test POST success!')
    res.status(200).send('test POST success!')
})

// get all grad plans
// APPLY: pagination & search by: ...
router.get('/', (req, res) => {
    console.log('test GET success!')
    res.status(200).send('test GET success!')
})

export default router