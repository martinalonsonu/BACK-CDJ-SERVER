import { Router } from "express";
import StudentController from "../controllers/student.controller";

const { createStudent, getStudents } = new StudentController();

const studentRouter = Router();

studentRouter.post('/register', createStudent);
studentRouter.get('/', getStudents);


export default studentRouter;