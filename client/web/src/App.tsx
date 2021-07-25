import React from "react";
import classes from "./App.module.scss";
import { Router, Switch, PublicRoute, PrivateRoute } from "./Router";
import { ClientRoute } from "./common/enums/routes";
import TopBar from "./components/TopBar";
import Signin from "./views/Signin";
import Signup from "./views/Signup";
import Home from "./views/Home";

function App() {
  const loading = false;
  const userAuthenticated = true;

  return (
    <div className={classes.root}>
      {loading && <h1>Loading...</h1>}

      {!loading && (
        <Router>
          {userAuthenticated && <TopBar />}

          <Switch>
            <PrivateRoute
              exact // Tells router to exactly match the path of this route
              authorized={userAuthenticated} // TODO : useState() with authentication to verify that user is loggedIn
              path={ClientRoute.Home}
              component={Home}
            />
            {/* <PrivateRoute
              exact
              authorized={userAuthenticated} // TODO : useState() with authentication to verify that user is loggedIn
              path={ClientRoute.Tournaments}
              component={Tournaments}
            /> */}
            <PublicRoute path={ClientRoute.Signin} component={Signin} />
            <PublicRoute path={ClientRoute.Signup} component={Signup} />
            {/* <PublicRoute path={ClientRoute.Playground} component={Playground} /> */}
          </Switch>
        </Router>
      )}
    </div>
  );
}

export default App;
