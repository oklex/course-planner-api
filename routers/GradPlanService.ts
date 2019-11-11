import { Router } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import checkToken from "../middleware/AuthMiddleware";
import db from "../database/knex";

dotenv.config();
const router = Router();

router.post('/create', (req, res) => {
    try {
        // var plan_id: string = req.body.plan_id
        const department: string = req.body.department
        const plan_name: string = req.body.plan_name
        const starting_semester: string = req.body.starting_semester
        const degree_type: string = req.body.degree_type
        res.send({

        }) 
    } catch (err) {
        res.status(400).send("bad request", err);
    }
})

// endpoints to help with dynamic search results while typing
router.get('/departments', (req, res) => {
    try {
        // get all department names 
        // remove any duplicates
        // send as an array
    } catch (err) {
        res.status(400).send("bad request", err);
    }
})