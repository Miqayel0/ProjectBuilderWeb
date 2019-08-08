import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
// import { Logout } from '../../../action/auth';

class LogOut extends Component {
    constructor(props){
        super(props);
        this.logOut = this.logOut.bind(this);
    }
    async logOut(){
        if(await window.modal.confirm('Are you sure?', 'Do you want to logout?')){
            this.props.LogOut(this.props.history);
        }
    }
    render() {
        return (
            <header className="logout">
                <button className="btn" type="submit" onClick={this.logOut}>Log Out</button>
            </header>
        );
    }
}
LogOut.propType = {
    LogOut: propTypes.func.isRequired,
}
export default withRouter(LogOut);