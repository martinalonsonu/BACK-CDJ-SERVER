import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";

class User extends Model<UserInterface> {
    public id!: number;
    public document!: string;
    public email!: string;
    public password!: string;
    public status!: number;
    public typeUser_id!: number;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        email: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            comment: '0 = inactivo, 1 = activo'
        },
        typeUser_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: 'user',
        tableName: 'tbl_user',
    }
);

export default User