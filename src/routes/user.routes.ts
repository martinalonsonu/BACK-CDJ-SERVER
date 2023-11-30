import { Router } from "express";
import UserController from "../controllers/user.controller";

const userRouter = Router();
const { loginUser, getUsers, getOneUser, createUser, updateUser, changePassword, deleteUser } = new UserController();

userRouter.post('/login', loginUser);
userRouter.get('/', getUsers);
userRouter.get('/:id', getOneUser);
userRouter.post('/register', createUser);
userRouter.put('/update/:id', updateUser);
userRouter.put('/changePassword', changePassword);
userRouter.delete('/delete/:id', deleteUser);

export default userRouter;