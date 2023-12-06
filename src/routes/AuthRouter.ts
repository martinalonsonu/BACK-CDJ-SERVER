import { Router } from "express";
import AuthController from "../controllers/AuthController";

class AuthRouter {
    public authRouter: Router
    private authController: AuthController

    constructor() {
        this.authRouter = Router();
        this.authController = new AuthController()
        this.routes()
    }

    routes() {
        this.authRouter.use('/login', this.authController.loginUser);
        this.authRouter.put('/changePassword', this.authController.changePassword);
    }
}

export default AuthRouter;