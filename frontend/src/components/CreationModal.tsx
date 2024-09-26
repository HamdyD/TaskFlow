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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minWidth="750px">
        <ModalHeader fontSize="xs" fontWeight="normal">
          New issue
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
