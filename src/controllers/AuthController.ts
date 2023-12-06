import { Request, Response } from "express";
import { loginRequest, updatePasswordRequest } from "../types/request/user.request";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import AuthService from "../services/authService";

const { login, changePassword } = new AuthService()
class AuthController {
    loginUser = async (req: loginRequest, res: Response): Promise<void> => {
        const { email, password, typeUserId } = req.body;
        try {
            const token: string = await login(email, password, typeUserId);
            res.status(200).json({ token })
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    me = async (req: Request, res: Response) => {
        const user = req.user;
        try {
            res.status(200).json(user)
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

}

export default AuthController;