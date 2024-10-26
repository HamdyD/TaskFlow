import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  CheckCircleIcon,
  RepeatIcon,
  SmallCloseIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import { Priority, Status } from "../constants/propertiesConstants";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa";
import { BiLoaderCircle } from "react-icons/bi";

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
      return BsThreeDots; // No priority
  }
};

export const getStatusIcon = (status: Status) => {
  switch (status) {
    case Status.Backlog:
      return BiLoaderCircle;
    case Status.ToDo:
      return FaRegCircle;
    case Status.InProgress:
      return RepeatIcon;
    case Status.Done:
      return CheckCircleIcon;
    case Status.Canceled:
      return AiOutlineCloseCircle;
    default:
      return SmallCloseIcon;
  }
};

export const getStatusColor = (status: Status) => {
  switch (status) {
    case Status.Backlog:
      return "gray.400";
    case Status.ToDo:
      return "blue.400";
    case Status.InProgress:
      return "yellow.400";
    case Status.Done:
      return "green.500";
    case Status.Canceled:
      return "gray.600";
    default:
      return "gray.500";
  }
};
