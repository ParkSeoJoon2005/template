import { Switch, Route } from "react-router-dom";

//Page Load
import Login from "../../Pages/AccountPages/Login";
import Register from "../../Pages/AccountPages/Register";
import AccountInfo from "../../Pages/AccountPages/AccountInfo";

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
