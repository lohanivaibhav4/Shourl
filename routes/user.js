import express from 'express'
import { handleUserLogin, handleUserRegistration } from '../controllers/user.js'
const router = express.Router()

router.post('/register',handleUserRegistration)
router.post('/login', handleUserLogin)

const userRouter = router
export default userRouter