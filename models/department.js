'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class department  extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  department.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "department sudah ada"
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
      afterValidate: (department, options) => {
        if(department.name){
          department.name = department.name.toLowerCase();
        }
      }
    },
    sequelize,
    modelName: 'Department',
  });
  return department;
};