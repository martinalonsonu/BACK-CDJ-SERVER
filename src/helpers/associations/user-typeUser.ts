import User from "../../models/user.model";
import TypeUser from "../../models/typeUser.model";

User.belongsTo(TypeUser, {
    foreignKey: 'typeUser_id',
    as: 'typeUser',
});

TypeUser.hasMany(User, {
    foreignKey: 'typeUser_id',
    as: 'users',
});
