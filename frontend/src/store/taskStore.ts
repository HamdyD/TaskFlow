import { create } from "zustand";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskById,
} from "../services/taskService";
import { TaskT } from "../types/taskType";
import { getErrorMessage } from "../utils/errorUtils";

type TastkState = {
  tasks: TaskT[];
  isTaskLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<TaskT | null>;
  addTask: (task: Omit<TaskT, "id">) => Promise<void>;
  editTask: (id: string, task: Partial<TaskT>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
};

export const useTaskStore = create<TastkState>((set, get) => ({
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
  fetchTaskById: async (id: string) => {
    const { tasks } = get();

    // Check if the task already exists in the store
    const existingTask = tasks.find((t) => t.id === id);
    if (existingTask) {
      return existingTask;
    }

    set({ isTaskLoading: true });
    try {
      const fetchedTask = await getTaskById(id);

      set({
        tasks: [...tasks, fetchedTask],
        isTaskLoading: false,
      });
      return fetchedTask;
    } catch (error) {
      set({
        error: getErrorMessage(error),
        isTaskLoading: false,
      });
      return null;
    }
  },
  addTask: async (task: Omit<TaskT, "id">) => {
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
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
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
        tasks: state.tasks.filter((t) => t.id !== id),
        isTaskLoading: false,
      }));
    } catch (error) {
      set({ error: getErrorMessage(error), isTaskLoading: false });
    }
  },
}));
