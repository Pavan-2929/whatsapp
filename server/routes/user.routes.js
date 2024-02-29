import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { getAllUsers, getUserWithId, updateUser, userData } from '../controllers/user.controller.js'

const router = express.Router()

router.get('/user', verifyToken, userData)
router.post('/user/update', verifyToken, updateUser)
router.get("/user/get/:id", getUserWithId)
router.get("/user/allUsers", getAllUsers)

export default router