import { Request, Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const loginUser = async (req: Request, res: Response) => {
    const { email, password }: UserInterface = req.body;
    try {
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: email } })
        if (!userExists) {
            return res.status(400).json({
                message: "User does not exist"
            })
        };

        //Validación de password
        const passwordValidate: boolean = await bcrypt.compare(password, userExists.password)
        if (!passwordValidate) {
            return res.status(400).json({
                message: "Password is incorrect"
            });
        }

        //Generamos token
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY || 'cdj123', { expiresIn: "2h" })

        res.status(200).json({ token })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}