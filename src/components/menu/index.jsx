import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./menu.scss";

class SideDrawer extends Component {
    render() {
        return (
            <div className={"SideDrawer"}>
                <div className="Icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.506" height="18.506" ></svg>
                    <p>Projects</p>
                </div>
                <div className="LinkList">
                    <div className="NavItem">
                        <Link to="/ongoing">Ongoing Projects</Link>
                    </div>
                    <div className="NavItem">
                        <Link to="/finished">Finished Projects</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(SideDrawer);
