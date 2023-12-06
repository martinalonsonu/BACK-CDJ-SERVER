import { HandleError } from "../helpers/handlerController";
import Student from "../models/student.model";
import TypeUser from "../models/typeUser.model";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class AuthService {
    login = async (email: string, password: string, typeUserId: number): Promise<string> => {
        if (!email || !password) throw new HandleError(400, "Parameters not provided");
        //Validación de existencia de usuario
        const userExists: User | null = await User.findOne({ where: { email: email } })
        if (!userExists) throw new HandleError(404, "User not found.")
        let data: any;
        switch (typeUserId) {
            case 1:
            case 2:
            case 3:
            case 4:
                break;
            case 5:
                data = await Student.findOne({
                    where: { document: userExists.document }, attributes: {
                        exclude: ['createdAt', 'updatedAt', 'deletedAt']
                    }
                });
                break;
        }

        //Validación de password
        const passwordValidate: boolean = await bcrypt.compare(password, userExists.password)
        if (!passwordValidate) throw new HandleError(401, "Password is incorrect")

        //Generamos token
        const token = jwt.sign({
            id: data.id,
            type_document: data.type_document,
            document: data.document,
            student_code: data.student_code,
            name: data.name,
            patern_surname: data.patern_surname,
            matern_surname: data.matern_surname,
            sex: data.sex,
            civil_status: data.civil_status,
            date_birth: data.date_birth,
            country: data.country,
            region: data.region,
            province: data.province,
            district: data.district,
            address: data.address,
            native_language: data.native_language,
            discapacity: data.discapacity,
            religion: data.religion,
            dataUser: {
                id: userExists.id,
                document: userExists.document,
                typeDocument: userExists.type_document,
                email: userExists.email,
                typeUserId: userExists.typeUser_id
            }
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
}

export default AuthService;