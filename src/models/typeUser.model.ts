import { DataTypes, Model } from "sequelize";
import sequelize from "../db/connection";
import User from "./user.model";

class TypeUser extends Model<TypeUserInterface> {
    public id!: number;
    public name!: string;
}

TypeUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        }
    },
    {
        sequelize,
        modelName: 'typeUser',
        tableName: 'tbl_type_user',
    }
);


export default TypeUser;
