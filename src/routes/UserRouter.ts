import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRouter {
    public userRouter: Router;
    private userController: UserController;

    constructor() {
        this.userRouter = Router();
        this.userController = new UserController();
        this.routes()
    }

    private routes = (): void => {
        this.userRouter.get('/', this.userController.getUsers);
        this.userRouter.get('/type', this.userController.getTypeUsers);
        this.userRouter.get('/:id', this.userController.getOneUserById);
        this.userRouter.post('/register', this.userController.createUser);
        this.userRouter.put('/update/:id', this.userController.updateUser);
        this.userRouter.delete('/delete/:id', this.userController.deleteUser);
    }
}

export default UserRouter;