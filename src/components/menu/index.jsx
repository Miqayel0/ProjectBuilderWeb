import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./menu.scss";

class SideDrawer extends Component {
    render() {
        return (
            <div className={"SideDrawer"}>
                <div className="Icon">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.506"
                        height="18.506"
                        viewBox="0 0 18.506 18.506"
                    >
                        <defs />
                        <g transform="translate(11.516 0.141) rotate(45)">
                            <g transform="translate(0 0)">
                                <path
                                    className="a"
                                    d="M8.39,9.273A11.584,11.584,0,0,0,5.119.111a.4.4,0,0,0-.553,0A11.58,11.58,0,0,0,1.295,9.273a4.913,4.913,0,0,0,.041,6.692A.394.394,0,0,0,2,15.592a4.492,4.492,0,0,1-.1-.756,2.959,2.959,0,0,1,.527-1.695.4.4,0,0,0,.188.049h4.46a.4.4,0,0,0,.188-.049,2.959,2.959,0,0,1,.527,1.695,5.5,5.5,0,0,1-.1.756.393.393,0,0,0,.662.372A4.913,4.913,0,0,0,8.39,9.273ZM4.84.962A10.578,10.578,0,0,1,6.557,3.485H3.128A10.38,10.38,0,0,1,4.84.962ZM1.152,14.3a4.14,4.14,0,0,1,.294-3.94c0,.03.414,1.615.572,2.022A3.707,3.707,0,0,0,1.152,14.3Zm5.661-1.9H2.868a10.819,10.819,0,0,1-.09-8.124H6.9A10.819,10.819,0,0,1,6.813,12.4Zm.854-.015c.218-.566.568-2,.572-2.022A4.076,4.076,0,0,1,8.9,12.6a4.15,4.15,0,0,1-.365,1.7,3.768,3.768,0,0,0-.866-1.919Z"
                                    transform="translate(0)"
                                />
                                <path
                                    className="a"
                                    d="M.4,0A.393.393,0,0,0,.117.117l0,0a.394.394,0,0,0-.1.173A.476.476,0,0,0,0,.4V4.332a.37.37,0,0,0,.011.09.391.391,0,0,0,.76,0,.372.372,0,0,0,.011-.09V.391A.325.325,0,0,0,.768.286.381.381,0,0,0,.4,0Z"
                                    transform="translate(3.65 13.872)"
                                />
                                <path
                                    className="a"
                                    d="M.391,0A.391.391,0,0,0,0,.391V2.36a.391.391,0,0,0,.783,0V.391A.386.386,0,0,0,.391,0Z"
                                    transform="translate(5.238 13.872)"
                                />
                            </g>
                        </g>
                    </svg>
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
