import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import CreationModal from "./CreationModal";
import { MAIN_BACKGROUND_COLOR } from "../utils/layoutConstants";
import { useState } from "react";

const SideBar = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      width="250px"
      height="100vh"
      backgroundColor={MAIN_BACKGROUND_COLOR}
      color="white"
      padding="4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Box position="relative" display="inline-block" margin="0">
        <Button
          onClick={onOpen}
          leftIcon={<EditIcon />}
          colorScheme="blue"
          variant="solid"
        >
          Create task
        </Button>
        {(title || description) && (
          <Box
            position="absolute"
            top="-4px"
            right="32px"
            width="12px"
            height="12px"
            borderRadius="50%" // Makes it a circle
            backgroundColor="yellow.500"
            border={`1px solid var(--chakra-colors-blue-50)`} // Same color as MAIN_BACKGROUND_COLOR
          />
        )}
      </Box>
      <CreationModal
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
    </Box>
  );
};

export default SideBar;
