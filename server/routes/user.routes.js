import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getUserWithId, updateUser, userData } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/user', verifyToken, userData)
router.post('/user/update', verifyToken, updateUser)
router.get("/user/get/:id", getUserWithId)

export default router