import { Response, Router, Request } from "express";
import { createStudent, getStudents } from "../controllers/student.controller";

const studentRouter = Router();

studentRouter.post('/register', createStudent)
studentRouter.get('/', getStudents)


export default studentRouter;