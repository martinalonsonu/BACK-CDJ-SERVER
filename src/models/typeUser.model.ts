import { DataTypes, Model, Op, col, fn, where } from "sequelize";
import sequelize from "../db/connection";
import User from "./user.model";

class TypeUser extends Model<TypeUserInterface> {
    public id!: number;
    public name!: string;

    static filters(search: string) {
        return {
            [Op.or]: [
                where(fn('LOWER', col('id')), 'LIKE', `%${search.toLowerCase()}%`),
            ],
        }
    }
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
        timestamps: false
    }
);

export default TypeUser;
