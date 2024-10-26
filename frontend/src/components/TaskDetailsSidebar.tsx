import {
  ArrowDownIcon,
  ArrowForwardIcon,
  ArrowUpIcon,
  SmallCloseIcon,
  WarningIcon,
} from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { PRIORITY_OPTIONS } from "../constants/propertiesConstants";
import { TaskT } from "../types/taskType";
import { useTaskStore } from "../store/taskStore";

type TaskDetailsSidebarProps = {
  task: TaskT;
};
const TaskDetailsSidebar = ({ task }: TaskDetailsSidebarProps) => {
  const { editTask } = useTaskStore();

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "Urgent":
        return WarningIcon;
      case "High":
        return ArrowUpIcon;
      case "Medium":
        return ArrowForwardIcon;
      case "Low":
        return ArrowDownIcon;
      default:
        return SmallCloseIcon; // No priority
    }
  };

  return (
    <Flex
      direction="column"
      borderLeft="1px solid lightgray"
      minWidth="220px"
      maxWidth="280px"
      paddingY="2"
      paddingX="4"
    >
      <Text fontSize="sm" marginBottom="4">
        Properties
      </Text>
      <Menu>
        <MenuButton
          as={Button}
          size="sm"
          variant="ghost"
          textAlign="left"
          fontWeight="normal"
        >
          {
            <>
              <Icon as={getPriorityIcon(task?.priority)} marginRight="8px" />
              {task?.priority}
            </>
          }
        </MenuButton>
        <MenuList>
          {PRIORITY_OPTIONS.map((priority) => {
            const PriorityIcon = getPriorityIcon(priority);
            return (
              <MenuItem
                key={priority}
                onClick={() => editTask(task.id, { priority })}
              >
                <Icon as={PriorityIcon} marginRight="8px" />
                {priority}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default TaskDetailsSidebar;
