import { Router } from "express";
import userRouter from "./user.routes";
import parentRouter from "./parent.routes";

const router = Router();

router.use('/user', userRouter)
router.use('/parent', parentRouter)

export default router;