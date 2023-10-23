import { Router } from "express";
import { loginUser, createUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/login', loginUser)
userRouter.post('/register', createUser)

export default userRouter;