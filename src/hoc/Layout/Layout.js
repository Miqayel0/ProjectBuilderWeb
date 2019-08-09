import React, { Component } from "react";
import { connect } from "react-redux";

import "./Layout.scss";
import Toolbar from "../../components/toolbar/Toolbar";
import SideDrawer from "../../components/menu/";

class Layout extends Component {
    render() {
        return (
            <React.Fragment>
                <Toolbar isAuth={this.props.isAuthenticated} />
                <SideDrawer isAuth={this.props.isAuthenticated} />
                <main className={"Content"}>{this.props.children}</main>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);
