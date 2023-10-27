const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tbl_parent', {
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
        await queryInterface.dropTable('tbl_parent');
    },
};
