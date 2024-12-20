import axios from "axios";
import { TaskT } from "../types/taskType";

const API_URL = "http://localhost:3000/api/tasks";

export const getAllTasks = async (): Promise<TaskT[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTaskById = async (id: number): Promise<TaskT> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTask = async (task: Omit<TaskT, "id">): Promise<TaskT> => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

export const updateTask = async (
  id: number,
  updatedTask: Partial<TaskT>
): Promise<TaskT> => {
  const response = await axios.put(`${API_URL}/${id}`, updatedTask);
  return response.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
