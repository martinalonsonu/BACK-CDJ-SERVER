import { Router } from "express";
import AuthController from "../controllers/AuthController";
import validateToken from "../helpers/validate-token";

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
        this.authRouter.put('/changePassword', validateToken, this.authController.changePassword);
        this.authRouter.post('/me', validateToken, this.authController.me);
    }
}

export default AuthRouter;