import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import Login from "./containers/login";
import Account from "./containers/register";
import { GetAccount, Logout } from "./action/auth";
import Layout from "./hoc/Layout/Layout"
import OngoingProjects from "./containers/projects/ongoing"
import FinishedProjects from "./containers/projects/finished"

//import PrivateRoute from "./routes/ProtectedRoute";

class App extends Component {
    componentDidMount() {
        const token = localStorage.getItem("accessToken");
        if (token) {
            this.props.GetAccount(token);
        }
    }
    render() {
        let routes = (
            <Switch>
                <Route path="/sign-up" exact component={Account} />
                <Route path="/sign-in" exact component={Login} />} />
                <Redirect to="/sign-in" />
            </Switch>
        );

        if (this.props.isSignIn) {
            routes = (
                <Layout isAuth>
                    <Switch>
                        <Route path="/ongoing" exact component={OngoingProjects} />
                        <Route path="/finished" exact component={FinishedProjects} />
                        <Redirect to="/ongoing" />
                    </Switch>
                </Layout>
            );
        }
        return <div className="App">{routes}</div>;
    }
}

const mapStateToProps = store => {
    return {
        isSignIn: store.auth.isSignIn
    };
};
const mapDispatchToProps = dispatch => {
    return {
        GetAccount: token => dispatch(GetAccount(token)),
        Logout: history => dispatch(Logout(history))
    };
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
