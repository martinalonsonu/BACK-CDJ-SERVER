import { Router } from "express";
import { loginUser, createUser, updateUser } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/login', loginUser)
userRouter.post('/register', createUser)
userRouter.put('/update/:id', updateUser)

export default userRouter;