import { Router } from "express";
import ParentRouter from "./ParentRouter";
import StudentRouter from "./StudentRouter";
import UserRouter from "./UserRouter";
import StudentParentRouter from "./StudentParentRouter";
import AuthRouter from "./AuthRouter";

class IndexRouter {
    public router: Router;

    constructor() {
        this.router = Router();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        const { parentRouter } = new ParentRouter();
        const { studentRouter } = new StudentRouter();
        const { userRouter } = new UserRouter();
        const { studentParentRouter } = new StudentParentRouter();
        const { authRouter } = new AuthRouter()

        this.router.use('/auth', authRouter)
        this.router.use('/user', userRouter);
        this.router.use('/parent', parentRouter);
        this.router.use('/student', studentRouter);
        this.router.use('/student-parent', studentParentRouter);

    }
}

export default IndexRouter;
