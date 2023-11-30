import { Router } from "express";
import ParentRouter from "./ParentRouter";
import StudentRouter from "./StudentRouter";
import UserRouter from "./UserRouter";

const router = Router();
const { parentRouter } = new ParentRouter()
const { studentRouter } = new StudentRouter()
const { userRouter } = new UserRouter()

router.use('/user', userRouter)
router.use('/parent', parentRouter)
router.use('/student', studentRouter)

export default router;