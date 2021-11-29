import { Switch, Route } from "react-router-dom";

import Login from "../../Components/Login";

const UserPages = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register"></Route>
    </Switch>
  );
};

export default UserPages;
