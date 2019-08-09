import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Route } from 'react-router-dom';
import LogOut from '../components/header/logout';
import Account from "../components/header/account";
import Menu from '../components/menu';
import Footer from '../components/footer';
import NotFound from '../components/notFound';

export default class privateRoot extends Component {
    render() {

        if (this.props.isSignIn && (this.props.permissions.length === 0 || this.props.permissions.includes(this.props.permission))) {
            return (
                <Route {...this.props} >
                    <div className="privateMain">
                        <div className="header">
                            <Account />
                            <LogOut isSignIn={this.props.isSignIn} LogOut={this.props.LogOut} />
                        </div>
                        <div className="wrapper">
                            <Menu permission={this.props.permission} />
                            {this.props.children}
                        </div>
                        <Footer />
                    </div>
                </Route>
            );
        } else {
            return (<NotFound />);
        }

    }
}

privateRoot.propTypes = {
    isSignIn: propTypes.bool.isRequired,
    LogOut: propTypes.func.isRequired,
    path: propTypes.string.isRequired,
    permissions: propTypes.arrayOf(propTypes.string).isRequired,
    permission: propTypes.string.isRequired,
}