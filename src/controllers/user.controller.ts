import { Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { loginRequest, userCreateRequest } from "../request/user.request";
import { validationResult } from "express-validator";
import TypeUser from "../models/typeUser.model";

export const loginUser = async (req: loginRequest, res: Response) => {
    const { email, password } = req.body;
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

export const createUser = async (req: userCreateRequest, res: Response) => {
    const data = req.body
    try {
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: data.email, document: data.document } })
        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        };

        //Encriptación de contraseña
        const encryptPassword = bcrypt.hashSync(data.password, 10)
        const newData = { ...data, password: encryptPassword }

        //Creación de usuario
        const createUser = await User.create(newData)
        await createUser.save()

        //Respuesta
        const typeUser = await TypeUser.findByPk(createUser.typeUser_id) //filtramos el tipo de usuario
        const response: createUserResponse = {
            id: createUser.id,
            email: createUser.email,
            document: createUser.document,
            typeUser_id: createUser.typeUser_id,
            typeUser: typeUser?.name || '',
        }
        return res.status(200).json({
            message: "User created successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};
