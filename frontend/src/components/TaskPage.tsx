import { Box, Flex, Input, Spinner, Textarea } from "@chakra-ui/react";
import { useParams } from "wouter";
import { useTaskStore } from "../store/taskStore";
import { useEffect, useState } from "react";
import { TaskT } from "../types/taskType";
import { MARGIN_Y } from "../utils/layoutConstants";

const TaskPage = () => {
  const { fetchTaskById, editTask } = useTaskStore();
  const { id } = useParams();

  // Local state for task properties
  const [task, setTask] = useState<TaskT | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      return;
    }
    const loadTask = async () => {
      const fetchedTask = await fetchTaskById(id);
      if (fetchedTask) {
        setTask(fetchedTask);
        setTitle(fetchedTask.title);
        setDescription(fetchedTask.description || "");
      }
      setLoading(false);
    };
    loadTask();
  }, [id, fetchTaskById]);

  if (loading) {
    return (
      <Flex direction="column" align="center" justify="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!task) {
    return <>Task not found</>;
  }

  return (
    <Flex
      direction="column"
      maxHeight={`calc(100vh - ${MARGIN_Y}px)`}
      backgroundColor="white"
      width="100%"
      margin="4"
      borderRadius="md"
      overflowY="auto"
    >
      <Box
        width="calc(100% - 120px)"
        maxWidth="76ch"
        marginTop="12"
        marginLeft="auto"
        marginRight="auto"
      >
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => {
            if (id) {
              editTask(id, { title });
            }
          }}
          placeholder="Task Title"
          _placeholder={{ opacity: 0.6, fontWeight: "bold" }}
          marginBottom="2"
          fontWeight="bold"
          fontSize="xl"
          border="none"
        />
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => {
            if (id) {
              editTask(id, { description });
            }
          }}
          placeholder="Add description..."
          _placeholder={{ opacity: 0.6 }}
          border="none"
          resize="none"
          marginBottom="4"
          minHeight="150px"
          onInput={(e) => {
            // Auto-resize the textarea based on content
            e.currentTarget.style.height = "auto"; // Reset height to auto
            e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set height to scrollHeight
          }}
        />
      </Box>
    </Flex>
  );
};

export default TaskPage;
