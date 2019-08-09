import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
//

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

