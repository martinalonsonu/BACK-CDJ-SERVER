import { Response } from "express";
import { createStudentRequest, studentData } from "../types/request/student.request";
import { handleServiceError, handleSuccessful } from "../helpers/handlerController";
import studentService from "../services/studentService";

export const createStudent = async (req: createStudentRequest, res: Response) => {
    const data: studentData = req.body
    try {
        const student = await studentService.createNewStudent(data)
        handleSuccessful(201, res, "Student created successfully", student)
    } catch (error) {
        handleServiceError(error, res)
    }
}