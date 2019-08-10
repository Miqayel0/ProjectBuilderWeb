import React from "react";
import Icon from "../../assets/img/ProfileIcon.png";
import { useSelector, useDispatch } from "react-redux";
import { Logout } from "../../action/auth";
import "./Toolbar.scss";

const Toolbar = props => {
    const dispatch = useDispatch();
    const email = useSelector(state =>  state.auth.data && state.auth.data.email);
    return (
        <header className={"Toolbar"}>
            <img src={Icon} alt="Smiley face" height="42" width="42" />
            <span onClick={() => dispatch(Logout())}>{email}</span>
        </header>
    );
};

export default Toolbar;
