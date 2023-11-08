interface createUserResponse {
    id: number;
    email: string;
    document: string;
    typeUser_id: number;
    typeUser: string;
}

interface updateUserResponse {
    id: number;
    email: string;
    document: string;
    typeUser_id: number;
    typeUser: string;
}

interface getUsersResponse {
    id: number;
    document: string;
    email: string;
    typeUser_id: number;
    typeUser_name: string;
}