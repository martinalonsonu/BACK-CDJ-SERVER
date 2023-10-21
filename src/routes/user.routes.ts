import { Router } from "express";
import { loginUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/login', loginUser)

export default userRouter;