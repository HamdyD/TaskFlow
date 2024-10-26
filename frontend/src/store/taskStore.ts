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

type TaskState = {
  tasks: TaskT[];
  isTaskLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: number) => Promise<TaskT | null>;
  addTask: (task: Omit<TaskT, "id">) => Promise<void>;
  editTask: (id: number, task: Partial<TaskT>) => Promise<void>;
  removeTask: (id: number) => Promise<void>;
};

export const useTaskStore = create<TaskState>((set, get) => ({
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
  fetchTaskById: async (id: number) => {
    const { tasks } = get();

    // Check if the task already exists in the store
    const existingTask = tasks.find((t) => t.id === Number(id));
    if (existingTask) {
      return existingTask;
    }

    set({ isTaskLoading: true });
    try {
      const fetchedTask = await getTaskById(id);

      set({
        tasks: tasks.some((task) => task.id === fetchedTask.id)
          ? tasks.map((task) =>
              task.id === fetchedTask.id ? fetchedTask : task
            )
          : [...tasks, fetchedTask],
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
  editTask: async (id: number, task: Partial<TaskT>) => {
    try {
      const updatedTask = await updateTask(id, task);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updatedTask : t)),
      }));
    } catch (error) {
      set({ error: getErrorMessage(error) });
    }
  },
  removeTask: async (id: number) => {
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
