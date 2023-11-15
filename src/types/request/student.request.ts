import { Request } from "express";

export interface createStudentRequest extends Request {
    body: {
        email: string;
        type_document: string;
        document: string;
        student_code?: string;
        name: string;
        patern_surname: string;
        matern_surname: string;
        sex: string;
        civil_status: string;
        date_birth: string;
        country: string;
        region: string;
        province: string;
        district: string;
        address: string;
        native_language: string;
        discapacity: boolean;
        religion: string;
    }
}

export interface studentData {
    email: string;
    type_document: string;
    document: string;
    student_code?: string;
    name: string;
    patern_surname: string;
    matern_surname: string;
    sex: string;
    civil_status: string;
    date_birth: string;
    country: string;
    region: string;
    province: string;
    district: string;
    address: string;
    native_language: string;
    discapacity: boolean;
    religion: string;
}

