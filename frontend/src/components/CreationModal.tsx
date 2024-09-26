import {
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { useTaskStore } from "../store/taskStore";
import { useState } from "react";

type CreationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreationModal = ({ isOpen, onClose }: CreationModalProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTaskStore();

  const resetState = () => {
    setTitle("");
    setDescription("");
  };

  const onAddTask = async () => {
    await addTask({ title, description });
    onClose();
    resetState();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent
        minWidth="750px"
        maxHeight="calc(100vh - 120px)"
        overflow="hidden"
      >
        <ModalHeader fontSize="xs" fontWeight="normal">
          New issue
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" overflowY="auto">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Task title"
            _placeholder={{ opacity: 0.6, fontWeight: "bold" }}
            marginBottom="2"
            fontWeight="bold"
            fontSize="xl"
            border="none"
          />
          <Textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Add description..."
            _placeholder={{ opacity: 0.6 }}
            border="none"
            resize="none"
            height="100%"
            minHeight="150px"
            maxHeight="500px"
            overflowY="auto"
            onInput={(e) => {
              // Auto-resize the textarea based on content
              e.currentTarget.style.height = "auto"; // Reset height to auto
              e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`; // Set height to scrollHeight
            }}
          />
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme="blue" onClick={onAddTask}>
            Create task
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreationModal;
