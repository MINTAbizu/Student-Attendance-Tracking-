import express from 'express';
import logicontroller from '../controller/authcontroller.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/login', logicontroller.login);
router.get('/verifyuser', authmiddleware, logicontroller.verifyuser);

export default router;