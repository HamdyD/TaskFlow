import { create } from "zustand";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../services/taskService";
import { TaskT } from "../types/taskType";
import { getErrorMessage } from "../utils/errorUtils";

type TastkState = {
  tasks: TaskT[];
  isTaskLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (task: Omit<TaskT, "_id">) => Promise<void>;
  editTask: (id: string, task: Partial<TaskT>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TastkState>((set) => ({
  tasks: [],
  isTaskLoading: false,
  error: null,
  fetchTasks: async () => {
    set({ isTaskLoading: true });
    try {
      const tasks = await getAllTasks();
      set({ tasks, isTaskLoading: false });
    } catch (error) {
      set({ error: getErrorMessage(error), isTaskLoading: false });
    }
  },
  addTask: async (task: Omit<TaskT, "_id">) => {
    set({ isTaskLoading: true });
    try {
      const newTask = await createTask(task);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        isTaskLoading: false,
      }));
    } catch (error) {
      set({ error: getErrorMessage(error), isTaskLoading: false });
    }
  },
  editTask: async (id: string, task: Partial<TaskT>) => {
    set({ isTaskLoading: true });
    try {
      const updatedTask = await updateTask(id, task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t._id === id ? updatedTask : t)),
        isTaskLoading: false,
      }));
    } catch (error) {
      set({ error: getErrorMessage(error), isTaskLoading: false });
    }
  },
  removeTask: async (id: string) => {
    set({ isTaskLoading: true });
    try {
      await deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== id),
        isTaskLoading: false,
      }));
    } catch (error) {
      set({ error: getErrorMessage(error), isTaskLoading: false });
    }
  },
}));
