import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch, withRouter } from "react-router-dom";
import propTypes from "prop-types";
import Login from "./containers/login"
import PrivateRoute from "./routes/ProtectedRoute";
import Loading from "./components/loading"
import PublicRoute from "./routes/PublicRoute";
import { IsSignIn, Logout } from "../../action/auth";
import { PERMISSIONS } from "./utils/Constes";

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    const token = localStorage.getItem("accessToken");
    if (token) {
      this.props.IsSignIn(token);
    }
  }
  render() {
    const { loading, isSignIn, type } = this.props;
    if (loading) {
      return (
        <div className="main">
          <Loading />
        </div>
      );
    } else {
      return (
        <Switch>
          <PrivateRoute
            path="/home"
            isSignIn={isSignIn}
            permission={type}
            permissions={[PERMISSIONS.SUPER_ADMIN]}
            LogOut={this.props.LogOut}
          >
            <Home />
          </PrivateRoute>
          <PublicRoute
            path="/signin"
            isSignIn={isSignIn}
            permission={type}
            component={Login}
          />
        </Switch>
      );
    }
  }
}

const mapStateToProps = store => {
  return {
    loading: store.user.loading,
    isSignIn: store.user.isSignIn,
    type: store.user.data.type
  };
};
const mapDispatchToProps = dispatch => {
  return {
    IsSignIn: token => dispatch(IsSignIn(token)),
    LogOut: history => dispatch(Logout(history))
  };
};

App.propTypes = {
  loading: propTypes.bool.isRequired,
  isSignIn: propTypes.bool.isRequired,
  IsSignIn: propTypes.func.isRequired,
  type: propTypes.string.isRequired
};
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
