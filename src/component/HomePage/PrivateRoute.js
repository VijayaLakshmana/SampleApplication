import HomePage from "./HomePage";
import React from "react";
import PropTypes from "prop-types";
export default function PrivateRoute({ children }) {
  let username = sessionStorage.getItem("username");
  if (username) {
    return children;
  } else {
    return <HomePage />;
  }
}
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


