import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Link, useParams } from "wouter";
import { useTaskStore } from "../store/taskStore";
import { useEffect, useState } from "react";
import { MARGIN_Y } from "../utils/layoutConstants";
import { ChevronRightIcon } from "@chakra-ui/icons";
import TaskDetailsSidebar from "./TaskDetailsSidebar";

const TaskPage = () => {
  const { fetchTaskById, editTask, tasks, isTaskLoading } = useTaskStore();
  // FIXME: handle param retrieval in a global hook and not in every component
  const { id: idStr } = useParams();
  const id = Number(idStr);
  const toast = useToast();

  // Local state for task properties
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDescription, setDraftDescription] = useState("");

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    const loadTask = async () => {
      if (!task && id) {
        await fetchTaskById(id);
      }
    };
    loadTask();
  }, [id, fetchTaskById, task]);

  useEffect(() => {
    if (!task) {
      return;
    }
    setDraftTitle(task.title);
    setDraftDescription(task?.description || "");
  }, [task]);

  if (isTaskLoading) {
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
      maxHeight={`calc(100vh - ${MARGIN_Y}px)`}
      backgroundColor="white"
      width="100%"
      margin="4"
      borderRadius="md"
      overflowY="auto"
      border="1px solid lightgray"
    >
      <Flex direction="column" width="100%">
        <Box
          paddingX="4"
          paddingY="2"
          fontSize="sm"
          borderBottom="1px solid lightgray"
          color="gray.500"
        >
          <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
              <Link to="/tasks">All issues</Link>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink>Issue-{task?.id} </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Box>
        <Box
          width="calc(100% - 120px)"
          maxWidth="76ch"
          marginTop="12"
          marginLeft="auto"
          marginRight="auto"
        >
          <Input
            value={draftTitle}
            onChange={(e) => setDraftTitle(e.target.value)}
            onBlur={() => {
              if (draftTitle.trim() === "") {
                toast({
                  title: "Empty title",
                  description: "Task title cannot be empty",
                  status: "warning",
                  duration: 5000,
                  isClosable: true,
                  position: "bottom-right",
                });
                setDraftTitle(task.title); // Set back the former title to avoid empty title input

                return;
              }
              if (id && draftTitle !== task.title) {
                editTask(id, { title: draftTitle });
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
            value={draftDescription}
            onChange={(e) => setDraftDescription(e.target.value)}
            onBlur={() => {
              if (id && draftDescription !== task?.description) {
                editTask(id, { description: draftDescription });
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
      <TaskDetailsSidebar task={task} />
    </Flex>
  );
};

export default TaskPage;
