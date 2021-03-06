'use strict';
module.exports = (sequelize, DataTypes) => {
  const Data_kasus = sequelize.define('Data_kasus', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    nama:{ 
      type: DataTypes.STRING
    },
    waktu:{
      type: DataTypes.STRING
    },
    tanggal:{
      type: DataTypes.DATE
    },
    lat: {
      type: DataTypes.DOUBLE
    },
    long: {
      type: DataTypes.DOUBLE
    },
    kecamatan_id: {
      type: DataTypes.UUID
    },
    status: {
      type: DataTypes.TEXT
    },
    map_area: {
      type: DataTypes.STRING
    }
  }, {});
  Data_kasus.associate = function(models) {
    // associations can be defined here
    Data_kasus.belongsTo(models.Kecamatan, {foreignKey: 'kecamatan_id', targetKey : 'uuid', as: 'kecamatan'})
 
  };
  return Data_kasus;
};