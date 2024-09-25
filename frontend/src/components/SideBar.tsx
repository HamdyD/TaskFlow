import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import CreationModal from "./CreationModal";

const SideBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      width="250px"
      height="100vh"
      backgroundColor="gray.300"
      color="white"
      padding="4"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Button
        onClick={onOpen}
        leftIcon={<EditIcon />}
        colorScheme="teal"
        variant="solid"
      >
        Create task
      </Button>
      <CreationModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default SideBar;
