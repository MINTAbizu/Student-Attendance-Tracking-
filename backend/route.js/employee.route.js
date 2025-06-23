import express from 'express';
import { addEmployee, upload,getemployee } from '../controller/employee.controller.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.post(
  '/employee',
  authmiddleware,
  upload.single('image'),
  addEmployee
);
router.get( '/employee',authmiddleware ,getemployee)

export default router;