'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Data_kasus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      nama: {
        type: Sequelize.STRING
      },
      waktu: {
        type: Sequelize.STRING
      },
      tanggal:{
        type: Sequelize.DATE
      },
      lat: {
        type: Sequelize.DOUBLE
      },
      long: {
        type: Sequelize.DOUBLE
      },
      kecamatan_id: {
        type: Sequelize.UUID
      },
      status: {
        type: Sequelize.TEXT
      },
      map_area: {
        type: Sequelize.STRING
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
    .then(() => {
        queryInterface.addConstraint('Data_kasus',  {
          fields: ['kecamatan_id'],
          type: 'foreign key',
          name: 'data_kasus_kecamatan_id_fk',
          references: {
            table: 'Kecamatans',
            field: 'uuid'
          },
        })
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Data_kasus');
  }
};