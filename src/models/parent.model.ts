import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

class Parent extends Model<ParentInterface> {
    public id!: number;
    public type_document!: string;
    public document!: string;
    public name!: string;
    public patern_surname!: string;
    public matern_surname!: string;
    public sex!: string;
    public civil_status!: string;
    public isAlive!: boolean;
    public date_birth!: string;
    public instruction!: string;
    public ocupation!: string;
    public liveWithStudent!: boolean;
    public religion!: string;
    public cel_phone!: string;
}

Parent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        type_document: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        document: {
            type: DataTypes.STRING(15),
            allowNull: false,
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
        isAlive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        date_birth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        instruction: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        ocupation: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        liveWithStudent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        religion: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        cel_phone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'parent',
        tableName: 'tbl_parent',
        paranoid: true,
    }
);

export default Parent