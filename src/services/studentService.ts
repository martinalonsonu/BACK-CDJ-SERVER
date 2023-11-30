import { Op } from "sequelize";
import { HandleError } from "../helpers/handlerController";
import Student from "../models/student.model";
import User from "../models/user.model";
import { TypeUserEnum } from "../types/UserType/userType";
import { studentData } from "../types/request/student.request";
import { userData } from "../types/request/user.request";
import UserService from "./userService";

const { createOneUser, getOneUser } = new UserService()

class StudentService {
    createNewStudent = async (data: studentData) => {
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

        const userStudent: createUserResponse = await createOneUser(dataUser)
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
    };

    getStudents = async (search?: string) => {
        //condición de búsqueda
        let whereCondition = {};
        if (search) {
            whereCondition = {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${search}%`, // Buscar coincidencias parciales en el email
                        },
                    },
                    {
                        patern_surname: {
                            [Op.like]: `%${search}%`, // Buscar coincidencias parciales en el email
                        },
                    },
                    {
                        matern_surname: {
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
        };

        //búsqueda de registros
        const students = await Promise.all((await Student.findAll({
            paranoid: true,
            where: whereCondition,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })).map(async (student) => {
            const dataUser = await getOneUser(undefined, student.document);
            return {
                dataUser,
                ...student.toJSON() // Agregamos toJSON() para obtener un objeto plano de Sequelize
            };
        }));

        if (students.length === 0) throw new HandleError(404, "No existing students")
        return students
    };

    getStudentById = async (id: string): Promise<any> => {
        const studentExists: any = await Student.findByPk(id, {
            paranoid: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })
        if (!studentExists) throw new HandleError(400, "Student not found.")

        const response = {
            document: studentExists.document,
            student_code: studentExists.student_code,
            name: studentExists.name,
            patern_surname: studentExists.patern_surname,
            matern_surname: studentExists.matern_surname,
        }
        return response;
    }
}

export default StudentService;