const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tbl_student_parent_detail', {
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
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            deletedAt: {
                type: DataTypes.DATE,
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('tbl_student_parent_detail');
    },
};