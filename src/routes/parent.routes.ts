import { Router } from "express";
import ParentController from "../controllers/parent.controller";

const { getParents, getOneParent, createParent, updateParent, deleteParent } = new ParentController()
const parentRouter = Router();

parentRouter.get('/', getParents);
parentRouter.get('/:id', getOneParent);
parentRouter.post('/register', createParent);
parentRouter.put('/update/:id', updateParent);
parentRouter.delete('/delete/:id', deleteParent);


export default parentRouter;