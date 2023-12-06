import { DataTypes, Model, Op, col, fn, where } from "sequelize";
import sequelize from "../db/connection";

class StudentParentDetail extends Model<StudentParentInterface> {
    public id!: number;
    public idStudent!: number;
    public idParent!: number;
    public relationship!: string;
    public tutor!: boolean;

    static filters(search: string) {
        return {
            [Op.or]: [
                where(fn('LOWER', col('id')), 'LIKE', `%${search.toLowerCase()}%`),
            ],
        }
    }
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