import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import { Box, Flex, HStack, Icon, Skeleton, Text } from "@chakra-ui/react";
import { useLocation } from "wouter";
import { MARGIN_Y } from "../utils/layoutConstants";
import {
  getPriorityIcon,
  getStatusColor,
  getStatusIcon,
} from "../utils/iconUtils";

const TaskList = () => {
  const { fetchTasks, tasks, isTaskLoading } = useTaskStore();
  const [_, setLocation] = useLocation();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Flex
      maxHeight={`calc(100vh - ${MARGIN_Y}px)`}
      direction="column"
      backgroundColor="white"
      width="100%"
      margin="4"
      borderRadius="md"
      border="1px solid lightgray"
      overflowY="auto"
    >
      {isTaskLoading ? (
        <>
          {Array(6)
            .fill("")
            .map((_, index) => (
              <Box
                padding="4"
                borderBottom="1px solid lightgray"
                width="100%"
                key={index}
              >
                <Skeleton height="20px" width="100%" marginBottom="2" />
              </Box>
            ))}
        </>
      ) : (
        tasks.map((task) => {
          return (
            <HStack
              onClick={() => setLocation(`tasks/${task.id}`)}
              padding="4"
              gap="4"
              fontSize="sm"
              key={task?.id}
              borderBottom="1px solid lightgray"
              width="100%"
              _hover={{ backgroundColor: "yellow.50", cursor: "pointer" }}
            >
              <Icon as={getPriorityIcon(task.priority)} />
              <Text>Issue-{task.id}</Text>
              <Icon
                as={getStatusIcon(task.status)}
                color={getStatusColor(task.status)}
              />
              <Text>{task.title}</Text>
            </HStack>
          );
        })
      )}
    </Flex>
  );
};

export default TaskList;
