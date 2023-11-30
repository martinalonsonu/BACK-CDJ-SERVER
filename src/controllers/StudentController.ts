import { Response, response } from "express";
import { createStudentRequest, studentData, studentGetRequest } from "../types/request/student.request";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import StudentService from "../services/studentService";

const { createNewStudent, getStudents } = new StudentService()

class StudentController {
    createStudent = async (req: createStudentRequest, res: Response): Promise<void> => {
        const data: studentData = req.body
        try {
            const student = await createNewStudent(data)
            handleSuccessful(201, res, "Student created successfully", student)
        } catch (error) {
            handleServiceError(error, res)
        }
    };

    getStudents = async (req: studentGetRequest, res: Response): Promise<void> => {
        const { search } = req.body
        try {
            const students = await getStudents(search)
            handleSuccessful(200, res, "All students getting successfully", students)
        } catch (error) {
            handleServiceError(error, res)
        }
    };
};

export default StudentController;