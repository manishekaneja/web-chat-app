import { FC } from "react";
import { Route } from "react-router";

const ProtectedRoute: FC<{ path: string; component: FC<any> }> = ({
  component: Component,
  ...rest
}) => {
  return (
    <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
  );
};

export { ProtectedRoute };
