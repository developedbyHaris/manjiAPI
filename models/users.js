'use strict';
const bcrypt = require('bcrypt'),
  saltRounds = 10

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
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
    },
    email: {
      allowNull: false,
      type : DataTypes.STRING,
      validate : {
        isEmail : true
      },
      unique: true,
      set(value) {
        this.setDataValue('email', value ? value.toLowerCase() : null);
      },
    },
    password: {
      allowNull: false,
      type : DataTypes.STRING,
      set(value) {
        this.setDataValue('password', value ? bcrypt.hashSync(value, saltRounds) : null)
      }
    },
    role_id: {
      allowNull: false,
      type : DataTypes.UUID
    },
    is_active : {
      allowNull: false,
      type : DataTypes.BOOLEAN
    }
  }, {});
  users.associate = function(models) {
    users.belongsTo(models.roles, {foreignKey: 'role_id', targetKey : 'uuid', as: 'role'})
  };
  return users;
};