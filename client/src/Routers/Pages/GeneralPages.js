import { Switch, Route } from "react-router-dom";

import Home from "../../Components/Home";
import Test from "../../Components/Test";

const GeneralPages = () => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Home />
      </Route>
      <Route path="/link3">
        <Test />
      </Route>
    </Switch>
  );
};

export default GeneralPages;
