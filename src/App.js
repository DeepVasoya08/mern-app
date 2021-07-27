import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import firebase from "./firebase";

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/signup">{user ? <Redirect to="/" /> : <Signup />}</Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/profile/:id">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
