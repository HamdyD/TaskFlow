const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false, // stands for `required:true`
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Task;
