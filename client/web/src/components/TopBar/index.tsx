import React from "react";
import { Link /*Redirect*/ } from "react-router-dom";
import { ClientRoute } from "../../common/enums/routes";
import Logo from "../../assets/logo.png";
import classes from "./index.module.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

function TopBar() {
  const userAuthenticated = true;
  const groupName = "Current group";

  const [drawerState, setDrawerState] = React.useState({
    open: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setDrawerState({ open });
    };

  return (
    <AppBar className={classes.root} position="sticky">
      <Toolbar>
        {userAuthenticated && (
          <>
            <IconButton onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>

            {groupName != null && <Typography>{groupName}</Typography>}

            <div className={classes.grow}></div>

            <IconButton>
              <AccountCircleIcon />
            </IconButton>

            <SwipeableDrawer
              anchor="left"
              open={drawerState.open}
              onClose={toggleDrawer(false)}
              onOpen={toggleDrawer(true)}
              className={classes.drawer}
            >
              <div className={classes.drawerContent}>
                <h1>TEST</h1>
              </div>
            </SwipeableDrawer>
          </>
        )}

        {!userAuthenticated && (
          <>
            {/* <Link> */}
            <img src={Logo} alt="Logo" className={classes.logo} />
            {/* </Link> */}

            <div className={classes.grow}></div>

            <Button color="inherit" component={Link} to={ClientRoute.Signin}>
              Connexion
            </Button>

            <Button color="inherit" component={Link} to={ClientRoute.Signup}>
              Créer un compte
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
