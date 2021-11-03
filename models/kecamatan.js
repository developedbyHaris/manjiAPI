'use strict';
module.exports = (sequelize, DataTypes) => {
  const Kecamatan = sequelize.define('Kecamatan', {
    uuid: {
      type: DataTypes.UUIDV4
    },
    nama: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.DOUBLE
    },
    long: {
      type: DataTypes.DOUBLE
    },
    kodepos: { 
      type: DataTypes.JSON
    }
  }, {});
  Kecamatan.associate = function(models) {
    // associations can be defined here
    Kecamatan.hasMany(models.data_kasus, {foreignKey: 'kecamatan_id',as: 'data_kasus'})
  
  };
  return Kecamatan;
};