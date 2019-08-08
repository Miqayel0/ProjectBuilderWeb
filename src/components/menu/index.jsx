import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';
import MenuItem from './item';
import { PERMISSIONS } from "../../utils/Constes"

class Menu extends Component {
    render() {
        return (
            <div className={"menu"}>
                <ul>
                    <MenuItem
                        permission={this.props.permission}
                        permissions={[PERMISSIONS.ADMIN, PERMISSIONS.USER]}
                    >
                        <Link to="/home/outgoing" >
                            <span className="name"> Outgoing</span>
                        </Link>
                    </MenuItem>
                </ul>
            </div>
        );
    }
}

Menu.propTypes = {
    permission: propTypes.string.isRequired,
}
export default withRouter(Menu);