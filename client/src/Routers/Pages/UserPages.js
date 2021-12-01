import { Switch, Route } from "react-router-dom";

//Page Load
import Login from "../../Components/Login";
import Register from "../../Components/Register";
import AccountInfo from "../../Components/AccountInfo";

const UserPages = () => {
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/account">
        <AccountInfo />
      </Route>
    </Switch>
  );
};

export default UserPages;
