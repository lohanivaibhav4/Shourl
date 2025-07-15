import express from 'express'
const router = express.Router()

import { 
    handleGenerateShortURL,
    handleGetURLVisitHistory, 
    handleRedirectToRealURL 
} from '../controllers/url.js'

router.post('/',handleGenerateShortURL)
router.get('/:id', handleRedirectToRealURL)
router.get('/analytics/:id', handleGetURLVisitHistory)

const urlRouter = router
export default urlRouter

