import express from 'express'
import { createMessage, getMessage } from '../controllers/message.controllers.js'

const router = express.Router()

router.post("/create", createMessage)
router.get("/get/:conversationId", getMessage)

export default router