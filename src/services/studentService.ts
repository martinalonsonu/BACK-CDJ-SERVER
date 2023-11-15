import { HandleError } from "../helpers/handlerController";
import Student from "../models/student.model";
import User from "../models/user.model";
import { TypeUserEnum } from "../types/UserType/userType";
import { studentData } from "../types/request/student.request";
import { userData } from "../types/request/user.request";
import userService from "./userService";

const studentService = {
    createNewStudent: async (data: studentData) => {
        //Validación de existencia del estudiante
        const studentExists: Student | null = await Student.findOne({ where: { document: data.document } })
        const userExists: User | null = await User.findOne({ where: { document: data.document, email: data.email } })
        if (studentExists || userExists) throw new HandleError(400, "User already exists")

        //Creación de estudiante
        const createStudent = await Student.create(data)
        if (!createStudent) throw new HandleError(500, "Problem creating student")
        await createStudent.save()

        //Creación de usuario de estudiante
        const dataUser: userData = {
            email: data.email,
            password: `${data.document}${data.name}`, //dni+nombre
            type_document: data.type_document,
            document: data.document,
            status: 1,
            typeUser_id: TypeUserEnum.STUDENT
        }

        const userStudent: createUserResponse = await userService.createOneUser(dataUser)
        if (!userStudent) throw new HandleError(500, "Problem creating student")

        //respuesta
        const response: createStudentResponse = {
            id: userStudent.id,
            email: userStudent.email,
            document: userStudent.document,
            name: createStudent.name,
            lastName: `${createStudent.patern_surname} ${createStudent.matern_surname}`
        }

        return response;
    }
}

export default studentService