import { Response, Router, Request } from "express";
import Parent from "../models/parent.model";

const parentRouter = Router();

parentRouter.get('/get', async (req: Request, res: Response) => {
    const parents = await Parent.findAll()
    res.status(200).json({
        parents
    })
})


export default parentRouter;