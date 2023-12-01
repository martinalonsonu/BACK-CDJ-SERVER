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
                id: relation.id,
                idStudent: relation.idStudent,
                dataStudent: getOneStudent,
                idParent: relation.idParent,
                dataParent: getOneParentBy,
                relationship: relation.relationship,
                tutor: relation.tutor,
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
        if (!createStudentParent) throw new HandleError(500, "Problem creating relationship")
        await createStudentParent.save()

        //traer info
        const getOneStudent = await getStudentById(data.idStudent.toString())
        const getOneParentBy = await getOneParent(data.idParent.toString())
        if (!getOneStudent || !getOneParentBy) throw new HandleError(500, "Problem creating relationship")

        const response = {
            id: createStudentParent.id,
            idStudent: createStudentParent.idStudent,
            dataStudent: getOneStudent,
            idParent: createStudentParent.idParent,
            dataParent: getOneParentBy,
            relationship: createStudentParent.relationship,
            tutor: createStudentParent.tutor,
        }
        return response;
    };

    updateStudentParent = async (id: string, data: studentParentData) => {
        const studentParentExists: StudentParentDetail | null = await StudentParentDetail.findByPk(id, {
            paranoid: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'deletedAt']
            }
        })
        if (!studentParentExists) throw new HandleError(404, "Relationship does not exist")

        //actualizar el usuario   
        const updateStudentParent = await studentParentExists.update(data);
        if (!updateStudentParent) throw new HandleError(500, "Problem updating relationship")
        await updateStudentParent.save()

        const getOneStudent = await getStudentById(updateStudentParent.idStudent.toString())
        const getOneParentBy = await getOneParent(updateStudentParent.idParent.toString())

        //respuesta
        return {
            id: updateStudentParent.id,
            idStudent: updateStudentParent.idStudent,
            idParent: updateStudentParent.idParent,
            dataStudent: getOneStudent,
            dataParent: getOneParentBy,
            relationship: updateStudentParent.relationship,
            tutor: updateStudentParent.tutor
        }
    };

    deleteStudentParent = async (id: string) => {
        const studentParentExists: StudentParentDetail | null = await StudentParentDetail.findByPk(id)
        if (!studentParentExists) throw new HandleError(404, "Parent does not exist")

        await StudentParentDetail.destroy({ where: { id: id } })
        return true;
    };
}

export default StudentParentService;