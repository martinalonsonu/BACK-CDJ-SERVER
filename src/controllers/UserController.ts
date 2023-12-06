import { Response } from "express";
import { loginRequest, userGetRequest, userCreateRequest, userEditRequest, updatePasswordRequest, deleteUserRequest, userData, userGetOneRequest, typeUserGetRequest } from "../types/request/user.request";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import UserService from "../services/userService";

const { login, changePassword, getAllUsers, createOneUser, updateOneUser, deleteOneUser, getUserById, getTypeUsersList } = new UserService();

class UserController {
    loginUser = async (req: loginRequest, res: Response): Promise<void> => {
        const { email, password } = req.body;
        try {
            const token: string = await login(email, password);
            res.status(200).json({ token })
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    changePassword = async (req: updatePasswordRequest, res: Response): Promise<void> => {
        const { email, password, newPassword } = req.body;
        try {
            const changeSuccess = await changePassword(email, password, newPassword)
            changeSuccess && handleSuccessful(202, res, "Password updated successfully")
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    getUsers = async (req: userGetRequest, res: Response): Promise<void> => {
        const { search } = req.body;
        try {
            const users = await getAllUsers(search)
            handleSuccessful(200, res, "All users getting successfully", users)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    getOneUserById = async (req: userGetOneRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const user = await getUserById(id)
            handleSuccessful(200, res, "User getting successfully", user)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    createUser = async (req: userCreateRequest, res: Response): Promise<void> => {
        const data: userData = req.body
        try {
            const user: createUserResponse = await createOneUser(data)
            handleSuccessful(201, res, "User created successfully", user)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    updateUser = async (req: userEditRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        const { document, email, password, status, typeUser_id, type_document } = req.body;
        try {
            const user: updateUserResponse = await updateOneUser(id, document, email, password, status, typeUser_id, type_document);
            handleSuccessful(202, res, "User updated successfully", user)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    deleteUser = async (req: deleteUserRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const response = await deleteOneUser(id);
            response && handleSuccessful(200, res, "User deleted successfully")
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    getTypeUsers = async (req: typeUserGetRequest, res: Response) => {
        const { search } = req.body;
        try {
            const typeUsers = await getTypeUsersList(search)
            console.log('de acá?')
            handleSuccessful(200, res, "All type users getting successfully", typeUsers)
        } catch (error) {
            handleServiceError(error, res)
        }
    };
};

export default UserController;