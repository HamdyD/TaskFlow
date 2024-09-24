const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, require: true },
    description: String,
  },
  { timestamps: true } // feature in Mongoose that automatically adds createdAt and updatedAt fiels to the schema
);

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;
