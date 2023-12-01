import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import Student from "./student.model";
import Parent from "./parent.model";

class StudentParentDetail extends Model<StudentParentInterface> {
    public id!: number;
    public idStudent!: number;
    public idParent!: number;
    public relationship!: string;
    public tutor!: boolean;
}

StudentParentDetail.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idStudent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idParent: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        relationship: {
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['P', 'M', 'O']],
                    msg: 'Tipo de parentesco no válido',
                }
            },
            comment: 'P=PAPÁ, M=MAMÁ, O=OTRO'
        },
        tutor: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'studentParentDetail',
        tableName: 'tbl_student_parent_detail',
        paranoid: true,
    }
);

export default StudentParentDetail;