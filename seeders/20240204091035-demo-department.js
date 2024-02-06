'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Departments', [{
        id: 1,
        name: 'IT',
        description: `Melakukan pengembangan dan pemeliharaan perangkat lunak`,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'HRD',
        description: `Mengatur hak dan kewajiban yang harus dilakukan dan didapatkan`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Departments', null, {});
  }
};