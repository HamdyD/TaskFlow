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
  priority: {
    type: DataTypes.ENUM,
    values: ["No priority", "Urgent", "High", "Medium", "Low"],
    defaultValue: "No priority",
  },
  status: {
    type: DataTypes.ENUM,
    values: ["Backlog", "To do", "In Progress", "Done", "Canceled"],
    defaultValue: "Backlog",
  },
});

module.exports = Task;
