import { Op } from "sequelize";
import { HandleError } from "../helpers/handlerController";
import { studentParentData } from "../types/request/studenParent.request";
import StudentParentDetail from "../models/studentParentDetail";
import StudentService from "./studentService";
import ParentService from "./parentService";

const { getStudentById } = new StudentService()
const { getOneParent } = new ParentService()

class StudentParentService {
    getStudentParent = async (search?: string) => {
        //condición de búsqueda
        let whereCondition = {};
        if (search) {
            whereCondition = {
                [Op.or]: [
                    {
                        id: {
                            [Op.like]: `%${search}%`, // Buscar coincidencias parciales en el id
                        },
                    }
                ],
            };
        };

        const studenParent = await Promise.all((await StudentParentDetail.findAll({
            paranoid: true,
            where: whereCondition,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })).map(async (relation) => {
            const getOneStudent = await getStudentById(relation.idStudent.toString())
            const getOneParentBy = await getOneParent(relation.idParent.toString())
            return {
                idStudent: relation.idStudent,
                dataStudent: getOneStudent,
                idParent: relation.idParent,
                dataParent: getOneParentBy,
                relationship: relation.relationship,
            }
        }));
        if (studenParent.length === 0) throw new HandleError(404, "No relationships existing")
        return studenParent;
    };

    createStudentParent = async (data: studentParentData) => {
        //Validación de existencia de la relación
        const relationshipExists: StudentParentDetail | null = await StudentParentDetail.findOne({ where: { idStudent: data.idStudent, idParent: data.idParent } })
        if (relationshipExists) throw new HandleError(400, "Relationship already exists")

        //Creación de la relación
        const createStudentParent = await StudentParentDetail.create(data)
        if (!createStudentParent) throw new HandleError(500, "Problem creating student")
        await createStudentParent.save()

        //traer info
        const getOneStudent = await getStudentById(data.idStudent.toString())
        const getOneParentBy = await getOneParent(data.idParent.toString())
        if (!getOneStudent || !getOneParentBy) throw new HandleError(500, "Problem creating student")

        const response = {
            id: createStudentParent.id,
            idStudent: createStudentParent.idStudent,
            dataStudent: getOneStudent,
            idParent: createStudentParent.idParent,
            dataParent: getOneParentBy,
            relationship: createStudentParent.relationship,
        }
        return response;
    };

    updateStudentPatent = async (id: string, data: studentParentData) => { };

    deleteStudentParent = async (id: string) => { return true };
}

export default StudentParentService;