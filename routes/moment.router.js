import { Router } from "express";
const router = Router();
import * as controller from "../controllers/moments.controller.js"
import { newFileName, multerUpload } from "../helpers/functions.js";

const uploadImage = multerUpload("moments", null);



router.post("/image", uploadImage.single("image"), newFileName);
router.post("/", controller.createMoment);


export default router;