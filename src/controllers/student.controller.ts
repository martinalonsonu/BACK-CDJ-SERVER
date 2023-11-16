import { Response, response } from "express";
import { createStudentRequest, studentData, studentGetRequest } from "../types/request/student.request";
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

export const getStudents = async (req: studentGetRequest, res: Response) => {
    const { search } = req.body
    try {
        const students = await studentService.getStudents(search)
        handleSuccessful(200, res, "All students getting successfully", students)
    } catch (error) {
        handleServiceError(error, res)
    }
}