import { Router } from "express";
import ParentController from "../controllers/ParentController";

class ParentRouter {
    public parentRouter: Router;
    private parentController: ParentController

    constructor() {
        this.parentRouter = Router()
        this.parentController = new ParentController()
        this.routes()
    }

    private routes = (): void => {
        this.parentRouter.get('/', this.parentController.getParents);
        this.parentRouter.get('/:id', this.parentController.getOneParent);
        this.parentRouter.post('/register', this.parentController.createParent);
        this.parentRouter.put('/update/:id', this.parentController.updateParent);
        this.parentRouter.delete('/delete/:id', this.parentController.deleteParent);
    }
}

export default ParentRouter;