import { Response, Router, Request } from "express";
import { getParents, getOneParent, createParent, updateParent, deleteParent } from "../controllers/parent.controller";
import Parent from "../models/parent.model";

const parentRouter = Router();

parentRouter.get('/', getParents)
parentRouter.get('/:id', getOneParent)
parentRouter.post('/register', createParent)
parentRouter.put('/update/:id', updateParent)
parentRouter.delete('/delete/:id', deleteParent)


export default parentRouter;