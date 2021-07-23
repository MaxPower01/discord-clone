import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ClientRoute } from "./common/enums/routes";

interface PublicRouteProps extends RouteProps {
  component: any;
}

interface PrivateRouteProps extends PublicRouteProps {
  authorized: boolean;
}

const PublicRoute: FC<PublicRouteProps> = (props: PublicRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route {...rest} render={(routeProps) => <Component {...routeProps} />} />
  );
};

const PrivateRoute: FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        props.authorized ? (
          <Component {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: ClientRoute.Signin,
              state: { from: routeProps.location },
            }}
          />
        )
      }
    />
  );
};

export { BrowserRouter as Router, Switch } from "react-router-dom";
export { PublicRoute, PrivateRoute };
