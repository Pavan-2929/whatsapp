import express from "express";
import { createConversation, getConversation } from "../controllers/conversation.controllers.js";

const router = express.Router();

router.post("/create", createConversation);
router.get("/get/:id", getConversation)

export default router;
