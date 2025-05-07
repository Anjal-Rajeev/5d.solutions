import { Router } from "express";
const router = Router();
import * as controller from "../controllers/user.controller.js"

router.post("/", controller.createUser)


export default router;