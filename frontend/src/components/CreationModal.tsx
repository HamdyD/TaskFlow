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

type CreationModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreationModal = ({ isOpen, onClose }: CreationModalProps) => {
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
            placeholder="Task title"
            _placeholder={{ opacity: 0.6, fontWeight: "bold" }}
            marginBottom="2"
            fontWeight="bold"
            fontSize="xl"
            border="none"
          />
          <Textarea
            placeholder="Add description..."
            _placeholder={{ opacity: 0.6 }}
            border="none"
          />
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme="blue">Create task</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreationModal;
