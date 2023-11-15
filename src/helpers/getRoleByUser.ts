import { TypeUserEnum } from "../types/UserType/userType";

export const getRoleByUser = (typeUser: TypeUserEnum) => {
    switch (typeUser) {
        case TypeUserEnum.SUPERADMIN:
            return "Superadmin";
        case TypeUserEnum.DIRECTOR:
            return "Director";
        case TypeUserEnum.ADMINISTRATIVE:
            return "Administrativo";
        case TypeUserEnum.TEACHER:
            return "Docente";
        case TypeUserEnum.STUDENT:
            return "Estudiante";
        default:
            return "Unknown";
    }
}