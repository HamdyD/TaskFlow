import { Flex } from "@chakra-ui/react";
import SideBar from "./components/SideBar";
import TaskList from "./components/TaskList";
import TaskPage from "./components/TaskPage";
import { Redirect, Route, Switch } from "wouter";
import { MAIN_BACKGROUND_COLOR } from "./utils/layoutConstants";

const App = () => {
  return (
    <Flex direction="row" backgroundColor={MAIN_BACKGROUND_COLOR}>
      <SideBar />
      <Switch>
        {/* Redirect from root ("/") to "/tasks" */}
        <Route path="/">
          <Redirect to="/tasks" />
        </Route>
        <Route path="/tasks" component={TaskList} />
        <Route path="/tasks/:id" component={TaskPage} />
      </Switch>
    </Flex>
  );
};

export default App;
