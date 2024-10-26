export enum Priority {
  NoPriority = "No priority",
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
}

export enum Status {
  Backlog = "Backlog",
  ToDo = "To do",
  InProgress = "In Progress",
  Done = "Done",
  Canceled = "Canceled",
}

export const PRIORITY_OPTIONS = Object.values(Priority);
export const STATUS_OPTIONS = Object.values(Status);
