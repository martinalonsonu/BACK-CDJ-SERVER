import { Router } from "express";
import StudentController from "../controllers/StudentController";


class StudentRouter {
    public studentRouter: Router;
    private studentController: StudentController;

    constructor() {
        this.studentRouter = Router()
        this.studentController = new StudentController();
        this.routes()
    }

    private routes = (): void => {
        this.studentRouter.post('/register', this.studentController.createStudent);
        this.studentRouter.get('/', this.studentController.getStudents);
    }
}

export default StudentRouter;