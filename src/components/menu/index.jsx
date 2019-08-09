import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import "./menu.scss"

class SideDrawer extends Component {
    render() {
        return (
            <div className={"SideDrawer"}>
                <span>Projects</span>
                <NavLink to="/home/ongoing" exact>
                    <span className="name">Ongoing Projects</span>
                </NavLink>
                <NavLink to="/home/finished" exact>
                    <span className="name">Finished Projects</span>
                </NavLink>
            </div>
        );
    }
}

export default withRouter(SideDrawer);
