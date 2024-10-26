import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  RepeatIcon,
  SmallCloseIcon,
  TimeIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Priority, Status } from "../constants/propertiesConstants";

export const getPriorityIcon = (priority: Priority) => {
  switch (priority) {
    case Priority.Urgent:
      return WarningIcon;
    case Priority.High:
      return ArrowUpIcon;
    case Priority.Medium:
      return ArrowForwardIcon;
    case Priority.Low:
      return ArrowDownIcon;
    default:
      return SmallCloseIcon; // No priority
  }
};

export const getStatusIcon = (status: Status) => {
  switch (status) {
    case Status.Backlog:
      return TimeIcon;
    case Status.ToDo:
      return ArrowForwardIcon;
    case Status.InProgress:
      return RepeatIcon;
    case Status.Done:
      return CheckCircleIcon;
    case Status.Canceled:
      return SmallCloseIcon;
    default:
      return SmallCloseIcon;
  }
};
