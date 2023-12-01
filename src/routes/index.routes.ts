import { Router } from "express";
import ParentRouter from "./ParentRouter";
import StudentRouter from "./StudentRouter";
import UserRouter from "./UserRouter";
import StudentParentRouter from "./StudentParentRouter";

const router = Router();
const { parentRouter } = new ParentRouter()
const { studentRouter } = new StudentRouter()
const { userRouter } = new UserRouter()
const { studentParentRouter } = new StudentParentRouter

router.use('/user', userRouter);
router.use('/parent', parentRouter);
router.use('/student', studentRouter);
router.use('/student-parent', studentParentRouter);

export default router;