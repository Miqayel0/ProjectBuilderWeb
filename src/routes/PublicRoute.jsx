import React, { Component } from "react";
import propTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { PERMISSIONS } from "../utils/Constes";

export default class publicRoot extends Component {
  render() {
    if (!this.props.isSignIn) {
      return <Route {...this.props} />;
    } else {
      switch (this.props.permission) {
        /*     case PERMISSIONS.ADMIN:
                    return (<Redirect to={'/some protected resource'} />) */
        default:
          return <Redirect to={"/home/ongoing"} />;
      }
    }
  }
}
publicRoot.defaultTypes = {
  permission: "USER"
};
publicRoot.propTypes = {
  isSignIn: propTypes.bool.isRequired,
  permission: propTypes.string
};
