import React from "react";
import classes from "./App.module.scss";
import { Router, Switch, PublicRoute, PrivateRoute } from "./Router";
import { ClientRoute } from "./common/enums/routes";
import TopBar from "./components/TopBar";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Home from "./views/Home";

function App() {
  const loading = false; // TODO : useState()
  const userAuthenticated = true; // TODO : useState()

  return (
    <div className={classes.root}>
      {loading && <h1>Loading...</h1>}

      {!loading && (
        <Router>
          {userAuthenticated && <TopBar />}

          <Switch>
            <PrivateRoute
              exact // Tells router to exactly match the path of this route
              authorized={userAuthenticated}
              path={ClientRoute.Home}
              component={Home}
            />
            <PublicRoute path={ClientRoute.Signin} component={Signin} />
            <PublicRoute path={ClientRoute.Signup} component={Signup} />
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
