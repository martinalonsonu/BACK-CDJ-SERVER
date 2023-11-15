import { Router } from "express";
import userRouter from "./user.routes";
import parentRouter from "./parent.routes";
import studentRouter from "./student.routes";

const router = Router();

router.use('/user', userRouter)
router.use('/parent', parentRouter)
router.use('/student', studentRouter)

export default router;