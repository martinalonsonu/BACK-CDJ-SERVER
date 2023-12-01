import { Response } from "express";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import { studentParentCreateRequest, studentParentGetRequest, studentParentUpdateRequest, studentParentDeleteRequest } from "../types/request/studenParent.request";
import StudentParentService from "../services/studentParentService";

const { getStudentParent, createStudentParent, updateStudentParent, deleteStudentParent } = new StudentParentService()

class StudentParentController {
    getStudentParent = async (req: studentParentGetRequest, res: Response): Promise<void> => {
        const { search } = req.body
        try {
            const relationships = await getStudentParent(search)
            handleSuccessful(200, res, "All relations student-parent getting successfully", relationships)
        } catch (error) {
            handleServiceError(error, res)
        }
    }

    createStudentParent = async (req: studentParentCreateRequest, res: Response): Promise<void> => {
        const data = req.body
        try {
            const newRelationship = await createStudentParent(data)
            handleSuccessful(201, res, "Relationship student-parent created successfully", newRelationship)
        } catch (error) {
            console.log(error)
            handleServiceError(error, res)
        }
    }
    updateStudentParent = async (req: studentParentUpdateRequest, res: Response): Promise<void> => {
        const { id } = req.params
        const data = req.body
        try {
            const updateStudentParentResponse = await updateStudentParent(id, data)
            handleSuccessful(202, res, "Relationship student-parent updated successfully", updateStudentParentResponse)
        } catch (error) {
            handleServiceError(error, res)
        }
    }
    deleteStudentParent = async (req: studentParentDeleteRequest, res: Response): Promise<void> => {
        const { id } = req.params;
        try {
            const response = await deleteStudentParent(id);
            response && handleSuccessful(200, res, "User deleted successfully")
        } catch (error) {
            handleServiceError(error, res)
        }
    }
}

export default StudentParentController