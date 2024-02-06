'use strict';
const {
  v4
} = require('uuid')
const bcrypt = require('bcrypt')


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSaltSync(10)
    const adminId = await queryInterface.rawSelect('roles', {
      where: {
        name: 'admin'
      }
    }, ['id'])

    await queryInterface.bulkInsert('Users', [{
      id: v4(),
      name: 'admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin123', salt),
      role_id: adminId,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

  }
};