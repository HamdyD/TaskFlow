import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useLocation } from "wouter";
import { MARGIN_Y } from "../utils/layoutConstants";

const TaskList = () => {
  const { fetchTasks, tasks } = useTaskStore();
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
      {tasks.map((task) => {
        return (
          <Box
            onClick={() => setLocation(`tasks/${task._id}`)}
            padding="4"
            key={task._id}
            borderBottom="1px solid lightgray"
            width="100%"
            _hover={{ backgroundColor: "yellow.50", cursor: "pointer" }}
          >
            <Text fontSize="sm">{task.title}</Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default TaskList;
