import { Router } from "express";
import AuthService from './AuthService'
import PlannerService from './PlannerService'

const router = Router();
router.use('/users', AuthService)
router.use('/planners', PlannerService)

export default router;