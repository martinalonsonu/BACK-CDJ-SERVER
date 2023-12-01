import { Router } from "express";
import StudentParentController from "../controllers/StudentParentController"

class StudentParentRouter {
    public studentParentRouter: Router
    private studentParentController: StudentParentController;

    constructor() {
        this.studentParentRouter = Router();
        this.studentParentController = new StudentParentController();
        this.routes();
    }

    private routes = () => {
        this.studentParentRouter.get('/', this.studentParentController.getStudentParent);
        this.studentParentRouter.post('/register', this.studentParentController.createStudentParent);
        this.studentParentRouter.put('/update/:id', this.studentParentController.updateStudentParent);
        this.studentParentRouter.delete('/delete/:id', this.studentParentController.deleteStudentParent)
    }
}

export default StudentParentRouter