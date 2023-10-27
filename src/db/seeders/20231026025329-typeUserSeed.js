'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('tbl_type_user', [
            { name: 'Superadmin' },
            { name: 'Director' },
            { name: 'Administrativo' },
            { name: 'Docente' },
            { name: 'Alumno' },
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('tbl_type_user', null, {});
    }
};
