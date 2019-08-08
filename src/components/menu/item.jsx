import React, { Component } from 'react';
import propTypes from 'prop-types';

class MenuItem extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { permission, permissions, children, ...rest } = this.props;
        if(permissions.includes(permission)){
            return(
                <li {...rest}>
                    {children}
                </li>
            );
        }
        return null;
    }
}
MenuItem.propTypes = {
    permission: propTypes.string.isRequired,
    permissions: propTypes.arrayOf(propTypes.any).isRequired,
}
export default MenuItem;