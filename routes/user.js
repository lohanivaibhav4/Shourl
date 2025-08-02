import express from 'express'
import { handleUserLogin, handleUserLogout, handleUserRegistration } from '../controllers/user.js'
const router = express.Router()

router.post('/register',handleUserRegistration)
router.post('/login', handleUserLogin)
router.get('/logout', handleUserLogout)


const userRouter = router
export default userRouter