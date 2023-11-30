import { Response } from "express";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import { parentCreateRequest, parentDeleteRequest, parentGetOneRequest, parentGetRequest, parentUpdateRequest } from "../types/request/parent.request";
import ParentService from "../services/parentService";

const { getParents, getOneParent, createParent, deleteParent, updatePatent } = new ParentService();

class ParentController {
    getParents = async (req: parentGetRequest, res: Response): Promise<void> => {
        const { search } = req.body
        try {
            const parents = await getParents(search)
            handleSuccessful(200, res, "All parents getting successfully", parents)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    getOneParent = async (req: parentGetOneRequest, res: Response): Promise<void> => {
        const { id } = req.params
        try {
            const parent = await getOneParent(id)
            handleSuccessful(200, res, "Parent getting successfully", parent)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    createParent = async (req: parentCreateRequest, res: Response): Promise<void> => {
        const data = req.body
        try {
            const newParent = await createParent(data)
            handleSuccessful(201, res, "Parent created successfully", newParent)
        } catch (error) {
            console.log(error)
            handleServiceError(error, res)
        }
    };

    updateParent = async (req: parentUpdateRequest, res: Response): Promise<void> => {
        const { id } = req.params
        const data = req.body
        try {
            const updateParent = await updatePatent(id, data)
            handleSuccessful(202, res, "Parent updated successfully", updateParent)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    deleteParent = async (req: parentDeleteRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const response = await deleteParent(id);
            response && handleSuccessful(200, res, "User deleted successfully")
        } catch (error) {
            handleServiceError(error, res)
        }
    };
};

export default ParentController;
