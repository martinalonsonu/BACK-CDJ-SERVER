import { DataTypes, Model, Op, col, fn, where } from "sequelize";
import sequelize from "../db/connection";

class Student extends Model<StudentInterface> {
    public id!: number;
    public type_document!: string;
    public document!: string;
    public student_code!: string;
    public name!: string;
    public patern_surname!: string;
    public matern_surname!: string;
    public sex!: string;
    public civil_status!: string;
    public date_birth!: string;
    public country!: string;
    public region!: string;
    public province!: string;
    public district!: string;
    public address!: string;
    public native_language!: string;
    public discapacity!: boolean;

    static filters(search: string) {
        return {
            [Op.or]: [
                where(fn('LOWER', col('name')), 'LIKE', `%${search.toLowerCase()}%`),
                where(fn('LOWER', col('patern_surname')), 'LIKE', `%${search.toLowerCase()}%`),
                where(fn('LOWER', col('matern_surname')), 'LIKE', `%${search.toLowerCase()}%`),
                where(fn('LOWER', col('document')), 'LIKE', `%${search.toLowerCase()}%`),
            ],
        }
    }
}

Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type_document: {
            type: DataTypes.STRING(10),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['DNI', 'CE', 'PASAPORTE', 'PN']],
                    msg: 'Tipo de documento no válido',
                }
            },
            comment: 'DNI= DOCUMENTO NACIONAL DE IDENTIDAD, CE = CARNET DE EXTRANJERÍA, PN=PARTIDA DE NACIMIENTO'
        },
        document: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        student_code: {
            type: DataTypes.STRING(14),
            unique: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        patern_surname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        matern_surname: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        sex: {
            type: DataTypes.STRING(1),
            allowNull: false,
            validate: {
                isIn: {
                    args: [['H', 'M']],
                    msg: 'Debe elegir entre H o M',
                }
            },
            comment: 'H = HOMBRE, M = MUJER'
        },
        civil_status: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        date_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        region: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        province: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        district: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        native_language: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        discapacity: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        religion: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'student',
        tableName: 'tbl_student',
        paranoid: true,
    }
)

export default Student

