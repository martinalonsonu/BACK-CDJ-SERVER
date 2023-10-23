import { Request } from "express";

export interface loginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}

export interface userCreateRequest extends Request {
    body: {
        email: string;
        password: string;
        type_document: string;
        document: string;
        status: number;
        typeUser_id: number;
    }
}

export interface userEditRequest extends Request {
    params: {
        id: string;
    },
    body: {
        email: string;
        password: string;
        type_document: string;
        document: string;
        status: number;
        typeUser_id: number;
    }
}