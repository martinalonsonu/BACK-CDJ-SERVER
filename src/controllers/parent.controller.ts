import { Response } from "express";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import parentService from "../services/parentService";
import { parentCreateRequest, parentDeleteRequest, parentGetOneRequest, parentGetRequest, parentUpdateRequest } from "../request/parent.request";

export const getParents = async (req: parentGetRequest, res: Response) => {
    const { search } = req.body
    try {
        const parents = await parentService.getParents(search)
        handleSuccessful(200, res, "All parents getting successfully", parents)
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const getOneParent = async (req: parentGetOneRequest, res: Response) => {
    const { id } = req.params
    try {
        const parent = await parentService.getOneParent(id)
        handleSuccessful(200, res, "Parent getting successfully", parent)
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const createParent = async (req: parentCreateRequest, res: Response) => {
    const data = req.body
    try {
        const newParent = await parentService.createParent(data)
        handleSuccessful(201, res, "Parent created successfully", newParent)
    } catch (error) {
        console.log(error)
        handleServiceError(error, res)
    }
};

export const updateParent = async (req: parentUpdateRequest, res: Response) => {
    const { id } = req.params
    const data = req.body
    try {
        const updateParent = await parentService.updatePatent(id, data)
        handleSuccessful(202, res, "Parent updated successfully", updateParent)
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const deleteParent = async (req: parentDeleteRequest, res: Response) => {
    const { id } = req.params;
    try {
        const response = await parentService.deleteParent(id);
        response && handleSuccessful(200, res, "User deleted successfully")
    } catch (error) {
        handleServiceError(error, res)
    }
};