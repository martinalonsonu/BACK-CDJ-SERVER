import { Request } from "express";

export type relationship = "mom" | "dad" | "tutor"

//Types de controladores

export interface studentParentGetRequest extends Request {
    body: {
        search?: string;
    }
}

export interface studentParentCreateRequest extends Request {
    body: {
        idStudent: number;
        idParent: number;
        relationship: relationship;
    }
}

export interface studentParentUpdateRequest extends Request {
    params: {
        id: string,
    },
    body: {
        idStudent: number;
        idParent: number;
        relationship: relationship;
    }
};

export interface studentParentDeleteRequest extends Request {
    params: {
        id: string,
    }
};


//Types de servicios

export interface studentParentData {
    idStudent: number;
    idParent: number;
    relationship: relationship;
}