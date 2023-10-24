import { Router } from "express";
import { loginUser, changePassword, createUser, updateUser, deleteUser, getUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/login', loginUser)
userRouter.get('/', getUsers)
userRouter.post('/register', createUser)
userRouter.put('/update/:id', updateUser)
userRouter.put('/changePassword', changePassword)
userRouter.delete('/delete/:id', deleteUser)

export default userRouter;