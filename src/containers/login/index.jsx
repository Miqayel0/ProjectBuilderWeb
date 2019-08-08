import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login } from '../../action/auth';

let USERNAME_REGEX = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

class Root extends Component {
    constructor() {
        super();
        this.ErrorMessage = {
            usernameError: "Username is wrong",
            passwordError: "Password is wrng",
        }
        this.state = {
            username: '',
            password: '',
            error: { usernameError: false, passwordError: false },
            showError: false,
        };
    }

    inputHandler = e => {
        const { name, value } = e.target;
        const error = this.validateField(name, value);
        this.setState({ [name]: value, error: Object.assign({}, this.state.error, error), showError: false });
    }

    validateField(fieldName, value) {
        let error = {};
        switch (fieldName) {
            case 'username':
                if (value && !USERNAME_REGEX.test(value)) {
                    error.usernameError = true;
                } else {
                    error.usernameError = false;
                }
                break;
            case 'password':
                if (value && !(value.length >= 6)) {
                    error.passwordError = true;
                } else {
                    error.passwordError = false;
                }
                break;
            default:
                throw new Error(`${fieldName} is not defined`);
        }
        return error;
    }

    clickHandler = () => {
        const { username, password, error } = this.state;
        if (username && password && Object.keys(error).every((item) => !error[item])) {
            this.props.LoginAction(username, password, this.props.history);
        } else {
            this.setState({ showError: true });
        }
    }

    render() {
        const { username, password, error, showError } = this.state;
        let errorMessage = null;
        if (!(username && password)){
            errorMessage = 'Username and Password are empty'
        }else{
            const keys = Object.keys(error);
            keys.forEach((key) => {
                if (error[key]){
                    errorMessage = `${this.ErrorMessage[key]}`;
                }
            });
        }  
        return (
            <div className="main">
                <div className="login-form">
                    <h1>Sign In</h1>
                    <div className="head">
                        <img src='/public/images/user_login.png' />
                    </div>
                    <form action="javascript:void(0);" >
                        <input className={`valid ${error.usernameError ? 'error' : ''}`}
                            name="username" type="text" value={username}
                            onChange={this.inputHandler} placeholder="Username"
                        />
                        <input className={`valid ${error.passwordError ? 'error' : ''}`}
                            name="password" type="password" value={password}
                            onChange={this.inputHandler} placeholder="Password" 
                        />
                        {
                            (errorMessage && showError) ? (
                                <span className="error-message">{errorMessage}</span>
                            ) : ''
                        }
                        <button type="submit" className="loginBtn" onClick={this.clickHandler}>LOGIN</button>ShopUser
                    </form>     
                </div>
            </div>
            )
    }
}

const mapStateToProps = store => {
    return {};
}
const mapDispatchToProps = dispatch => {
    return {
        LoginAction: (username, password, history) => dispatch(Login(username, password, history)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));