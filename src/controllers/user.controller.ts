import { Response } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { loginRequest, userGetRequest, userCreateRequest, userEditRequest, updatePasswordRequest, deleteUserRequest } from "../request/user.request";
import { validationResult } from "express-validator";
import TypeUser from "../models/typeUser.model";
import { Op } from "sequelize";

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
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};

export const changePassword = async (req: updatePasswordRequest, res: Response) => {
    const { email, password, newPassword } = req.body;
    try {
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: email } })
        if (!userExists) {
            return res.status(400).json({
                message: "User does not exist"
            })
        };

        //validación de contraseña
        const passwordValidate = await bcrypt.compare(password, userExists.password)
        if (!passwordValidate) {
            return res.status(400).json({
                message: "Password is incorrect"
            })
        }

        //Encriptación de nueva contraseña
        const encryptPassword = bcrypt.hashSync(newPassword, 10)

        //actualizar el usuario   
        const updateUser = await userExists.update({ password: encryptPassword });
        await updateUser.save();

        //respuesta
        res.status(200).json({
            status: true,
            message: "Password updated successfully"
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};

export const getUsers = async (req: userGetRequest, res: Response) => {
    const { search } = req.body;
    try {
        //condición de búsqueda
        let whereCondition = {};
        if (search) {
            whereCondition = {
                [Op.or]: [
                    {
                        email: {
                            [Op.like]: `%${search}%`, // Buscar coincidencias parciales en el email
                        },
                    },
                    {
                        document: {
                            [Op.like]: `%${search}%`, // Buscar coincidencias parciales en el documento
                        },
                    },
                ],
            };
        }

        //búsqueda de registros
        const users = await User.findAll({
            attributes: ['id', 'document', 'email', 'typeUser_id'],
            include: [{ model: TypeUser, as: 'typeUser', attributes: ['name'] }],
            where: whereCondition,
            paranoid: true
        })
        if (users.length === 0) {
            return res.status(200).json({
                status: true,
                message: "No existing users",
                data: []
            })
        }
        res.status(200).json({
            status: true,
            message: "All users getting successfully",
            data: users
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
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
            status: true,
            message: "User created successfully",
            data: response
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};

export const updateUser = async (req: userEditRequest, res: Response) => {
    const { id } = req.params;
    const { document, email, password, status, typeUser_id, type_document } = req.body;
    try {
        const userExists: User | null = await User.findByPk(id)
        if (!userExists) {
            return res.status(400).json({
                message: "User does not exist"
            })
        };

        //Encriptación de contraseña
        const encryptPassword = bcrypt.hashSync(password, 10)

        //actualizar el usuario   
        const updateUser = await userExists.update({ document, email, password: encryptPassword, status, typeUser_id, type_document });
        await updateUser.save()

        //respuesta
        const typeUser = await TypeUser.findByPk(updateUser.typeUser_id) //filtramos el tipo de usuario
        const response: updateUserResponse = {
            id: updateUser.id,
            email: updateUser.email,
            document: updateUser.document,
            typeUser_id: updateUser.typeUser_id,
            typeUser: typeUser?.name || '',
        }
        res.status(200).json({
            status: true,
            message: "User updated successfully",
            data: response
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
};

export const deleteUser = async (req: deleteUserRequest, res: Response) => {
    const { id } = req.params;
    try {
        await User.destroy({ where: { id: id } })
        res.status(200).json({
            status: true,
            message: "User deleted successfully",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            error: error
        });
    }
}