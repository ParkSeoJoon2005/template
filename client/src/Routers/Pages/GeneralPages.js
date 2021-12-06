import { Switch, Route } from "react-router-dom";

import Home from "../../Pages/Home";
import Test from "../../Pages/GeneralPages/Test";
import Chat from "../../Pages/GeneralPages/Chat";

const GeneralPages = () => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/link1">
        <Chat />
      </Route>
      <Route path="/link3">
        <Test />
      </Route>
    </Switch>
  );
};

export default GeneralPages;
