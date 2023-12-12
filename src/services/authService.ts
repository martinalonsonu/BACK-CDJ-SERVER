import { HandleError } from "../helpers/handlerController";
import Student from "../models/student.model";
import TypeUser from "../models/typeUser.model";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class AuthService {
    login = async (email: string, password: string, typeUserId: number): Promise<string> => {
        if (!email || !password || !typeUserId) throw new HandleError(400, "Parameters not provided");
        //Validación de existencia de usuario
        const userExists: any = await User.findOne({ where: { email: email }, include: [{ model: TypeUser, as: 'typeUser', attributes: ['name'] }], })
        if (!userExists) throw new HandleError(404, "User not found.")
        if (userExists.typeUser_id !== typeUserId) throw new HandleError(404, "User not found.")
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
            id: data ? data.id : null,
            type_document: data ? data.type_document : null,
            document: data ? data.document : null,
            student_code: data ? data.student_code : null,
            name: data ? data.name : null,
            patern_surname: data ? data.patern_surname : null,
            matern_surname: data ? data.matern_surname : null,
            sex: data ? data.sex : null,
            civil_status: data ? data.civil_status : null,
            date_birth: data ? data.date_birth : null,
            country: data ? data.country : null,
            region: data ? data.region : null,
            province: data ? data.province : null,
            district: data ? data.district : null,
            address: data ? data.address : null,
            native_language: data ? data.native_language : null,
            discapacity: data ? data.discapacity : null,
            religion: data ? data.religion : null,
            role: userExists?.typeUser?.name,
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