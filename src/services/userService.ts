import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { userData } from "../types/request/user.request";
import TypeUser from "../models/typeUser.model";
import { HandleError } from "../helpers/handlerController";
import { getRoleByUser } from "../helpers/getRoleByUser";

class UserService {
    login = async (email: string, password: string): Promise<string> => {
        if (!email || !password) throw new HandleError(400, "Parameters not provided");
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: email } })
        if (!userExists) throw new HandleError(404, "User not found.")

        //Validación de password
        const passwordValidate: boolean = await bcrypt.compare(password, userExists.password)
        if (!passwordValidate) throw new HandleError(4001, "Password is incorrect")

        //Generamos token
        const token = jwt.sign({
            email: email
        }, process.env.SECRET_KEY || 'cdj123', { expiresIn: "2h" })

        return token;
    };

    changePassword = async (email: string, password: string, newPassword: string): Promise<boolean> => {
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
    };

    getAllUsers = async (search?: string): Promise<any[]> => {
        //condición de búsqueda: importamos filtros del modelo
        const searchCondition = User.filters(search || '')

        //búsqueda de registros
        const users = (await User.findAll({
            attributes: ['id', 'document', 'email', 'typeUser_id'],
            include: [{ model: TypeUser, as: 'typeUser', attributes: ['name'] }],
            where: searchCondition,
            paranoid: true
        })).map((user: any) => ({
            id: user.id,
            document: user.document,
            email: user.email,
            idTypeUser: user.typeUser_id,
            typeUser: user.typeUser.name
        }))
        if (users.length === 0) throw new HandleError(404, "No existing users")
        return users;
    };

    getUserById = async (id: string): Promise<any> => {
        const userExists: any = await User.findByPk(id, {
            attributes: ['id', 'document', 'email', 'typeUser_id'],
            include: [{ model: TypeUser, as: 'typeUser', attributes: ['name'] }],
            paranoid: true
        })
        if (!userExists) throw new HandleError(400, "User not found.")

        const response = {
            idUser: userExists.id,
            document: userExists.document,
            email: userExists.email,
            idTypeUser: userExists.typeUser_id,
            typeUser: userExists.typeUser.name
        }
        return response;
    };

    getOneUser = async (id?: string, document?: string): Promise<any> => {
        const searchId = await User.findByPk(id, {
            attributes: ['id', 'document', 'email', 'typeUser_id'],
            include: [{ model: TypeUser, as: 'typeUser', attributes: ['name'] }],
            paranoid: true
        })

        const searchDocument = await User.findOne({
            where: { document: document },
            attributes: ['id', 'document', 'email', 'typeUser_id'],
            include: [{ model: TypeUser, as: 'typeUser', attributes: ['name'] }],
            paranoid: true
        })
        const userExists: any = id ? searchId : searchDocument
        if (!userExists) throw new HandleError(400, "User not found.")

        const response = {
            idUser: userExists.id,
            document: userExists.document,
            email: userExists.email,
            idTypeUser: userExists.typeUser_id,
            typeUser: userExists.typeUser.name
        }
        return response;
    };

    createOneUser = async (data: userData): Promise<createUserResponse> => {
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
        const role = getRoleByUser(createUser.typeUser_id)

        const response: createUserResponse = {
            id: createUser.id,
            email: createUser.email,
            document: createUser.document,
            idTypeUser: createUser.typeUser_id,
            typeUser: role
        }

        return response;
    };

    updateOneUser = async (id: string, document: string, email: string, password: string, status: number, typeUser_id: number, type_document: string): Promise<updateUserResponse> => {
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
    };

    deleteOneUser = async (id: string): Promise<boolean> => {
        const userExists: User | null = await User.findByPk(id)
        if (!userExists) throw new HandleError(404, "Parent does not exist")

        await User.destroy({ where: { id: id } })
        return true;
    };

    getTypeUsersList = async (search?: string): Promise<any[]> => {
        //condición de búsqueda: importamos filtros del modelo
        const searchCondition = TypeUser.filters(search || '')

        //búsqueda de registros
        const typeUsers = await TypeUser.findAll({
            paranoid: true,
            where: searchCondition,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })
        console.log(typeUsers)
        if (typeUsers.length === 0) throw new HandleError(404, "No existing user types")
        return typeUsers;
    };
}


export default UserService

