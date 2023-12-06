const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tbl_student', {
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
            },
            student_code: {
                type: DataTypes.STRING(14),
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
        await queryInterface.dropTable('tbl_student');
    },
};