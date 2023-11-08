import { HandleError } from "../helpers/handlerController";
import Student from "../models/student.model";
import User from "../models/user.model";
import { studentData } from "../types/request/student.request";

const studentService = {
    createNewStudent: async (data: studentData) => {
        //Validación de existencia del estudiante
        const studentExists: Student | null = await Student.findOne({ where: { document: data.document } })
        const userExists: User | null = await User.findOne({ where: { document: data.document, email: data.email } })
        if (studentExists || userExists) throw new HandleError(400, "User already exists")

        //Creación 
    }
}

export default studentService