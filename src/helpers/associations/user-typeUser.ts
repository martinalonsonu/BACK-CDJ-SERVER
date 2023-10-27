import User from "../../models/user.model";
import TypeUser from "../../models/typeUser.model";
import Student from "../../models/student.model";
import Parent from "../../models/parent.model";
import StudentParentDetail from "../../models/studentParentDetail";

//Relación User - Type User

User.belongsTo(TypeUser, {
    foreignKey: 'typeUser_id',
    as: 'typeUser',
});

TypeUser.hasMany(User, {
    foreignKey: 'typeUser_id',
    as: 'users',
});

// Relación  Student - StudentParentDetail

StudentParentDetail.belongsTo(Student, {
    foreignKey: 'idStudent',
    as: 'students'
})

Student.hasMany(StudentParentDetail, {
    foreignKey: 'idStudent',
    as: 'studentsDetail',
});

// Relación Parent - StudentParentDetail

StudentParentDetail.belongsTo(Parent, {
    foreignKey: 'idParent',
    as: 'parents'
})

Parent.hasMany(StudentParentDetail, {
    foreignKey: 'idParent',
    as: 'parentsDetail',
});
