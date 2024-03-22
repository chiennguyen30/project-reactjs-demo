import React from "react";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user.dataAcount);

  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger" className="mt-3">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Change this and that and try again. Duis mollis, est non commodo luctus,</p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoute;
