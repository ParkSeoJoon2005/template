import { Switch, Route } from "react-router-dom";

import Home from "../../Pages/Home";
import Test from "../../Pages/GeneralPages/Test";
import ChatRooms from "../../Pages/GeneralPages/ChatRooms";
import Chat from "../../Pages/GeneralPages/Chat";

const GeneralPages = () => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/chat">
        <ChatRooms />
      </Route>
      <Route path="/chatRoom">
        <Chat />
      </Route>
      <Route path="/link3">
        <Test />
      </Route>
    </Switch>
  );
};

export default GeneralPages;
