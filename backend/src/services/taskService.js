const Task = require("../models/task");

class TaskService {
  async getAllTasks() {
    try {
      return await Task.findAll();
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getTaskById(id) {
    try {
      return await Task.findByPk(id);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createTask(data) {
    try {
      return await Task.create(data);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateTask(id, data) {
    try {
      const [updatedRowCount, [updatedTask]] = await Task.update(data, {
        where: { id },
        returning: true,
      });
      if (updatedRowCount === 0) {
        throw new Error("Task not found");
      }
      return updatedTask;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteTask(id) {
    try {
      const deletedRows = await Task.destroy({ where: { id } });
      if (deletedRows === 0) {
        throw new Error("Task not found");
      }
      return { message: "Task deleted successfully" };
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new TaskService();
