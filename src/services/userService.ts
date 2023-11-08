import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { userData } from "../types/request/user.request";
import TypeUser from "../models/typeUser.model";
import { Op } from "sequelize";
import { HandleError } from "../helpers/handlerController";

const userService = {

    login: async (email: string, password: string) => {
        if (!email || !password) throw new HandleError(400, "Parameters not provided");
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: email } })
        if (!userExists) throw new HandleError(404, "User not found")

        //Validación de password
        const passwordValidate: boolean = await bcrypt.compare(password, userExists.password)
        if (!passwordValidate) throw new HandleError(4001, "Password is incorrect")

        //Generamos token
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY || 'cdj123', { expiresIn: "2h" })

        return token;
    },

    changePassword: async (email: string, password: string, newPassword: string) => {
        if (!email || !password || !newPassword) throw new HandleError(400, "Parameters not provided");
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: email } })
        if (!userExists) throw new HandleError(404, "User does not exist")

        //validación de contraseña
        const passwordValidate = await bcrypt.compare(password, userExists.password)
        if (!passwordValidate) throw new HandleError(400, "Password is incorrect")

        //Encriptación de nueva contraseña
        const encryptPassword = bcrypt.hashSync(newPassword, 10)

        //actualizar el usuario   
        const updateUser = await userExists.update({ password: encryptPassword });
        await updateUser.save();

        return true;
    },

    getAllUsers: async (search?: string) => {
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
        if (users.length === 0) throw new HandleError(404, "No existing users")
        return users;
    },

    createOneUser: async (data: userData) => {
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: data.email, document: data.document } })
        if (userExists) throw new HandleError(400, "User already exists")

        //Encriptación de contraseña
        const encryptPassword = bcrypt.hashSync(data.password, 10)
        const newData = { ...data, password: encryptPassword }

        //Creación de usuario
        const createUser = await User.create(newData)
        if (!createUser) throw new HandleError(500, "Problem creating user")
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

        return response;
    },

    updateOneUser: async (id: string, document: string, email: string, password: string, status: number, typeUser_id: number, type_document: string) => {
        const userExists: User | null = await User.findByPk(id)
        if (!userExists) throw new HandleError(404, "User does not exist")

        //Encriptación de contraseña
        const encryptPassword = bcrypt.hashSync(password, 10)

        //actualizar el usuario   
        const updateUser = await userExists.update({ document, email, password: encryptPassword, status, typeUser_id, type_document });
        if (!updateUser) throw new HandleError(500, "Problem updating user")
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

        return response;
    },

    deleteOneUser: async (id: string) => {
        const userExists: User | null = await User.findByPk(id)
        if (!userExists) throw new HandleError(404, "Parent does not exist")

        await User.destroy({ where: { id: id } })
        return true;
    }
};

export default userService

