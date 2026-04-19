import { Router } from "express";
import { chatSchema } from "../validator";
import { validate } from "../middleware/validate.middleware";
import { handleChat } from "../controller/user.controller";
const router = Router();
router.post("/chat",validate(chatSchema),handleChat)


export default router