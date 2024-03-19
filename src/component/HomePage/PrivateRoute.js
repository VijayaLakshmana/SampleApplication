import Login from "../LoginPage/Login";
import React from "react";
import PropTypes from "prop-types";
export default function PrivateRoute({ children }) {
  let username = sessionStorage.getItem("username");
  if (username) {
    return children;
  } else {
    return <Login />;
  }
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
