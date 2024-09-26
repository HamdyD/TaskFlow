import { Flex } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <Flex direction="row" backgroundColor="gray.300">
      <SideBar />
      <TaskList />
    </Flex>
  );
};

export default App;
