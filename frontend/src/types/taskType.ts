import { Priority } from "../constants/propertiesConstants";

export type TaskT = {
  id: number;
  title: string;
  description?: string;
  priority: Priority;
};
