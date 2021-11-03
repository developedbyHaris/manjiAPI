'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid : {
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        unique : true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addIndex('roles', ['uuid']));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Roles');
  }
};