import express from 'express';
import {addDepartment,listDepartments,updateDepartment} from '../controller/department.controller.js';
import authmiddleware from '../middleware/authmiddleware.js';

const router = express.Router();

router.post("/department", authmiddleware, addDepartment);

router.get('/listdepartment', authmiddleware, listDepartments);

router.put('/department/:id', updateDepartment);
// /api/department
export default router;