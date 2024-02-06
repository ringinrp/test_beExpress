'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  level.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "level sudah ada"
      },
      validate: {
        notNull: {
          msg: "inputan data tidak boleh kosong"
        }
      },
    },
    description: DataTypes.TEXT
  }, {
    hooks: {
      afterValidate: (level, options) => {
        if(level.name){
          level.name = level.name.toLowerCase();
        }
      }
    },
    sequelize,
    modelName: 'Level',
  });
  return level;
};