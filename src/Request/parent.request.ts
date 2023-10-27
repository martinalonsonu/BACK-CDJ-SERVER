import { Request } from "express";

export interface parentGetRequest extends Request {
    body: {
        search?: string;
    }
}

export interface parentGetOneRequest extends Request {
    params: {
        id: string;
    }
}

export interface parentCreateRequest extends Request {
    body: {
        type_document: string;
        document: string;
        name: string;
        patern_surname: string;
        matern_surname: string;
        sex: string;
        civil_status: string;
        isAlive: boolean;
        date_birth: string;
        instruction: string;
        ocupation: string;
        liveWithStudent: boolean;
        religion: string;
        cel_phone: string;
    }
}

export interface parentData {
    type_document: string;
    document: string;
    name: string;
    patern_surname: string;
    matern_surname: string;
    sex: string;
    civil_status: string;
    isAlive: boolean;
    date_birth: string;
    instruction: string;
    ocupation: string;
    liveWithStudent: boolean;
    religion: string;
    cel_phone: string;
}

export interface parentUpdateRequest extends Request {
    params: {
        id: string,
    },
    body: {
        type_document: string;
        document: string;
        name: string;
        patern_surname: string;
        matern_surname: string;
        sex: string;
        civil_status: string;
        isAlive: boolean;
        date_birth: string;
        instruction: string;
        ocupation: string;
        liveWithStudent: boolean;
        religion: string;
        cel_phone: string;
    }
};

export interface parentDeleteRequest extends Request {
    params: {
        id: string,
    }
};