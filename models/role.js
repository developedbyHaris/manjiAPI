'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('roles', {
    uuid :{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name:  {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      },
      unique: true,
      set(value) {
        this.setDataValue('name', value ? value.toLowerCase() : null);
      },
      get() {
        const rawValue = this.getDataValue('name');
        const result = rawValue ? rawValue.toLowerCase().replace(/\b[a-z]/g, function(letter) {
            return letter.toUpperCase();
        }) : null

        return result
      }
    }
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.users, {foreignKey: 'role_id',as: 'users'})
  };
  return Role;
};