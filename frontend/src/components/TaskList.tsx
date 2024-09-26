import { useEffect } from "react";
import { useTaskStore } from "../store/taskStore";
import { Box, Flex } from "@chakra-ui/react";

const MARGIN_X = 32; // margin used in Flex component below

const TaskList = () => {
  const { fetchTasks, tasks } = useTaskStore();
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Flex
      maxHeight={`calc(100vh - ${MARGIN_X}px)`}
      direction="column"
      backgroundColor="white"
      width="100%"
      margin="4"
      borderRadius="md"
      overflowY="auto"
    >
      {tasks.map((task, id) => {
        return (
          <Box
            padding="4"
            key={id}
            borderBottom="1px solid lightgray"
            width="100%"
            _hover={{ backgroundColor: "gray.100" }}
          >
            {task.title}
          </Box>
        );
      })}
    </Flex>
  );
};

export default TaskList;
