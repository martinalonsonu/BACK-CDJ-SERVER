import { Response, Router, Request } from "express";
import { createStudent } from "../controllers/student.controller";

const studentRouter = Router();

studentRouter.post('/register', createStudent)


export default studentRouter;