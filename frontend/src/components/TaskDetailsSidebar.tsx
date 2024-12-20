import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "../constants/propertiesConstants";
import { TaskT } from "../types/taskType";
import { useTaskStore } from "../store/taskStore";
import {
  getPriorityIcon,
  getStatusColor,
  getStatusIcon,
} from "../utils/iconUtils";

type TaskDetailsSidebarProps = {
  task: TaskT;
};
const TaskDetailsSidebar = ({ task }: TaskDetailsSidebarProps) => {
  const { editTask } = useTaskStore();

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
      <VStack alignItems="left" gap="2">
        <Menu>
          <MenuButton
            as={Button}
            size="sm"
            variant="ghost"
            textAlign="left"
            fontWeight="normal"
            leftIcon={
              <Icon
                as={getStatusIcon(task.status)}
                color={getStatusColor(task.status)}
                marginRight="2"
              />
            }
          >
            {task.status}
          </MenuButton>
          <MenuList>
            {STATUS_OPTIONS.map((status) => {
              const PriorityIcon = getStatusIcon(status);
              return (
                <MenuItem
                  key={status}
                  onClick={() => editTask(task.id, { status })}
                >
                  <Icon
                    as={PriorityIcon}
                    color={getStatusColor(status)}
                    marginRight="2"
                  />
                  {status}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton
            as={Button}
            leftIcon={
              <Icon as={getPriorityIcon(task?.priority)} marginRight="2" />
            }
            size="sm"
            variant="ghost"
            textAlign="left"
            fontWeight="normal"
          >
            {task?.priority}
          </MenuButton>
          <MenuList>
            {PRIORITY_OPTIONS.map((priority) => {
              const PriorityIcon = getPriorityIcon(priority);
              return (
                <MenuItem
                  key={priority}
                  onClick={() => editTask(task.id, { priority })}
                >
                  <Icon as={PriorityIcon} marginRight="2" />
                  {priority}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      </VStack>
    </Flex>
  );
};

export default TaskDetailsSidebar;
