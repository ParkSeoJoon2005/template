import { Switch, Route } from "react-router-dom";

//Page Load
import Login from "../../Components/Login";
import Register from "../../Components/Register";

const UserPages = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  );
};

export default UserPages;
