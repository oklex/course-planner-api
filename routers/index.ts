import { Router } from "express";
import AuthService from './AuthService'

const router = Router();
router.use('/users', AuthService)

export default router;