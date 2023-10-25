import { Response } from "express";
import { loginRequest, userGetRequest, userCreateRequest, userEditRequest, updatePasswordRequest, deleteUserRequest, userData } from "../request/user.request";
import { userService } from "../services/userService";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";

export const loginUser = async (req: loginRequest, res: Response) => {
    const { email, password } = req.body;
    try {
        const token: string = await userService.login(email, password);
        res.status(200).json({ token })
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const changePassword = async (req: updatePasswordRequest, res: Response) => {
    const { email, password, newPassword } = req.body;
    try {
        const changeSuccess = await userService.changePassword(email, password, newPassword)
        changeSuccess && handleSuccessful(202, res, "Password updated successfully")
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const getUsers = async (req: userGetRequest, res: Response) => {
    const { search } = req.body;
    try {
        const users = await userService.getAllUsers(search)
        handleSuccessful(200, res, "All users getting successfully", users)
    } catch (error) {
        handleServiceError(error, res)
    }
}

export const createUser = async (req: userCreateRequest, res: Response) => {
    const data: userData = req.body
    try {
        const user: createUserResponse = await userService.createOneUser(data)
        handleSuccessful(201, res, "User created successfully", user)
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const updateUser = async (req: userEditRequest, res: Response) => {
    const { id } = req.params;
    const { document, email, password, status, typeUser_id, type_document } = req.body;
    try {
        const user: updateUserResponse = await userService.updateOneUser(id, document, email, password, status, typeUser_id, type_document);
        handleSuccessful(202, res, "User updated successfully", user)
    } catch (error) {
        handleServiceError(error, res)
    }
};

export const deleteUser = async (req: deleteUserRequest, res: Response) => {
    const { id } = req.params;
    try {
        const response = await userService.deleteOneUser(id);
        response && handleSuccessful(200, res, "User deleted successfully")
    } catch (error) {
        handleServiceError(error, res)
    }
}