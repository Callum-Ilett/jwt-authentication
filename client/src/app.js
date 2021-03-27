import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch, useLocation } from "react-router";
import Appbar from "./components/Appbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

import AuthService from "./services/auth/authService";

const App = () => {
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await AuthService.getAuthenticatedUser();
        setIsLoggedIn(true);
        setUser(data);
      } catch {}
    };

    getUser();
  }, [location]);

  return (
    <>
      <Appbar
        isLoggedIn={isLoggedIn}
        user={user}
        setUser={setUser}
        setIsLoggedIn={setIsLoggedIn}
      />

      <Switch>
        <Route
          path="/"
          exact
          render={(props) => <Home {...props} isLoggedIn={isLoggedIn} />}
        />

        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />

        <Route
          path="/profile"
          render={(props) => <Profile {...props} user={user} />}
        />
      </Switch>
    </>
  );
};

export default App;
