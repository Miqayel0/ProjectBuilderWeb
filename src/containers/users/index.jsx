import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import Pagination from "react-js-pagination";
import {GetUsers, SendNotificationToUser, ToggleDisableUser} from '../../action/users';
import {GetProviders} from '../../action/shop';
import {GetUserFile} from '../../action/utilities';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {GetAgents} from "../../action/cards";
import Button from '@material-ui/core/Button';
import SendNotificationPopup from "../../components/editUserComponents/sendNotificationPopup";

const MAX_PROVIDERS = 6;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popupContent: '',
            activePage: props.match.params.page || 1,
            toggle: true,
            multi: false,
            itemsCount: 10,
            filter: {
                offset: ((props.match.params.page || 1) - 1) * 10,
                limit: 10,
                orderBy: 'createAt',
                dec: false,
                provider: null,
                agent: null,
                createAtStart: '',
                createAtEnd: '',
                contractEndDate: '',
                contractStartDate: '',
                lastActivityStart: '',
                lastActivityEnd: '',
                search: '',
                notAssign: false,
            },
        };
        this.onChange = this.onChange.bind(this);
        this.handlerChange = this.handlerChange.bind(this);
        this.handlerProviderSelect = this.handlerProviderSelect.bind(this);
        this.handlerAgentSelect = this.handlerAgentSelect.bind(this);
        this.openSendNotificationsModal = this.openSendNotificationsModal.bind(this);
        this.closeButtonPopup = this.closeButtonPopup.bind(this);
        this.handlerChangeCheckbox = this.handlerChangeCheckbox.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.columnOnChange = this.columnOnChange.bind(this);
        this.toggleDisableUser = this.toggleDisableUser.bind(this);
        this.getProviders = this.getProviders.bind(this);
        this.getFile = this.getFile.bind(this);
        this.searchInputPressedHandler = this.searchInputPressedHandler.bind(this);
    }

    openSendNotificationsModal() {
        this.setState({
            popupContent: (
                <SendNotificationPopup
                    closePopup={this.closeButtonPopup}
                    SendNotificationToUser={(title, body) => {
                        let message = {};
                        Object.assign(message, this.state.filter, {msgTitle: title, msgBody: body})
                        this.props.SendNotificationToUser(message)
                    }}
                />
            )
        });
    }

    closeButtonPopup() {
        this.setState({popupContent: ''});
    }

    handlerChange(e) {
        const {name, value} = e.target;
        const {filter} = this.state;
        this.setState({filter: {...filter, [name]: value}});
        this.props.GetUsers({...filter, [name]: value, dec: (filter.dec) ? 1 : -1});
    }

    searchInputPressedHandler(e){
        const { value } = e.target;
        const { filter } = this.state;
        this.setState({filter: {...filter, "search": value}});
        if( e.key==='Enter'){
            this.props.GetUsers({...filter, "search" : value, dec: (filter.dec) ? 1 : -1});
        }

    }


    handlerProviderSelect = (value) => {
        const {filter} = this.state;
        if (_.isEmpty(value)) {
            this.setState({filter: {...filter, provider: null}});
            this.props.GetUsers({...filter, provider: null, dec: (filter.dec) ? 1 : -1});
        } else {
            this.setState({filter: {...filter, provider: value._id}});
            this.props.GetUsers({...filter, provider: value._id, dec: (filter.dec) ? 1 : -1});
        }
    }
    handlerAgentSelect = (value) => {
        const {filter} = this.state;
        if (_.isEmpty(value)) {
            this.setState({filter: {...filter, agent: null}});
            this.props.GetUsers({...filter, agent: null, dec: (filter.dec) ? 1 : -1});
        } else {
            this.setState({filter: {...filter, agent: value._id}});
            this.props.GetUsers({...filter, agent: value._id, dec: (filter.dec) ? 1 : -1});
        }
    }

    handlerChangeCheckbox() {
        const {filter} = this.state;
        this.setState({filter: {...filter, notAssign: !filter.notAssign}});
        this.props.GetUsers({...filter, notAssign: !filter.notAssign, dec: (filter.dec) ? 1 : -1});
    }

    onChange(e) {
        const {value} = e.target;
        const {filter} = this.state;
        this.setState({filter: {...filter, limit: parseInt(value)}, itemsCount: parseInt(value), activePage: 1});
        this.props.GetUsers({...filter, limit: parseInt(value), dec: (filter.dec) ? 1 : -1, offset: 0});
    }

    paginationOnChange(page) {
        const {filter, itemsCount} = this.state;
        this.setState({activePage: page, filter: {...filter, offset: (page - 1) * itemsCount}});
        this.props.GetUsers({...filter, offset: (page - 1) * itemsCount, dec: (filter.dec) ? 1 : -1});
    }

    columnOnChange(orderBy) {
        const {filter} = this.state;
        if (orderBy !== filter.orderBy) {
            this.setState({filter: {...filter, orderBy}});
            this.props.GetUsers({...filter, orderBy, dec: (filter.dec) ? 1 : -1});
        } else {
            this.setState({filter: {...filter, dec: !filter.dec}});
            this.props.GetUsers({...filter, dec: (!filter.dec) ? 1 : -1});
        }
    }

    componentWillMount() {
        if (this.props.providers.length === 0) {
            this.props.GetProviders();
        }
        if (this.props.agents.length === 0) {
            this.props.GetAgents();
        }
    }

    componentDidMount() {
        const {filter} = this.state;
        this.props.GetUsers({...filter, dec: (filter.dec) ? 1 : -1});
    }

    async toggleDisableUser(e, id) {
        if (!e.target.checked) {
            if (await window.modal.confirm('Are you sure?', 'Do you want to disable this user?')) {
                this.props.ToggleDisableUser(id);
            }
        } else {
            this.props.ToggleDisableUser(id);
        }
    }

    getProviders = (input, callback) => {
        const {providers} = this.props;
        input = input.toLowerCase();
        var options = providers.map(
            item => ({...item, fullName: `${item.name} ${item.surname}`})
        ).filter(i => {
            return i.fullName.substr(0, input.length).toLowerCase() === input;
        });
        var data = {
            options: options.slice(0, MAX_PROVIDERS),
            complete: options.length <= MAX_PROVIDERS,
        };
        callback(null, data);
    };

    getAgents = (input, callback) => {
        const {agents} = this.props;
        input = input.toLowerCase();
        var options = agents.map(
            item => ({...item, fullName: `${item.name} ${item.surname}`})
        ).filter(i => {
            return i.fullName.substr(0, input.length).toLowerCase() === input;
        }).sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0
        })
        var data = {
            options: options,
            complete: options,
        };
        callback(null, data);
    };

    getFile() {
        const {filter} = this.state;
        GetUserFile({...filter, dec: (!filter.dec) ? 1 : -1});
    }

    render() {
        const {filter} = this.state;
        const {popupContent} = this.state;
        const {users, usersLoading} = this.props;
        const ifPagination = this.props.usersCount > this.state.itemsCount;
        return (
            <div className="users">
                <div className="searchField">
                    <button className="btn" onClick={this.getFile}>EXCEL</button>
                    <div className="fieldsStyle">
                        <div className="fields">
                            <div className="select">
                                <Select.Async
                                    className="selectAsync"
                                    key={Math.random()}
                                    placeholder="Providers"
                                    multi={this.state.multi}
                                    value={filter.provider}
                                    onChange={this.handlerProviderSelect}
                                    disabled={filter.notAssign}
                                    valueKey="_id"
                                    labelKey="name"
                                    loadOptions={this.getProviders}
                                />
                            </div>
                            <div className="lsatActivity">
                                <div className="fieldDescription">
                                    <span>Last Activity Start</span>
                                    <input
                                        type="date"
                                        name="lastActivityStart"
                                        value={filter.lastActivityStart}
                                        onChange={this.handlerChange}
                                        disabled={filter.notAssign}
                                    />
                                </div>
                                <div className="fieldDescription">
                                    <span>Last Activity End</span>
                                    <input
                                        type="date"
                                        name="lastActivityEnd"
                                        value={filter.lastActivityEnd}
                                        onChange={this.handlerChange}
                                        disabled={filter.notAssign}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="fields">
                            <div className="otherFilters">
                                <div className="filterBy">
                                    <Select.Async
                                        className="selectAsync"
                                        key={Math.random()}
                                        placeholder="Agents"
                                        multi={this.state.multi}
                                        value={filter.agent}
                                        onChange={this.handlerAgentSelect}
                                        disabled={filter.notAssign}
                                        valueKey="_id"
                                        labelKey="name"
                                        loadOptions={this.getAgents}
                                    />
                                </div>
                            </div>
                            <div className="otherFilters">
                                <div className="fieldDescription">
                                    <span>Contract Start</span>
                                    <input
                                        type="date"
                                        name="contractStartDate"
                                        value={filter.contractStartDate}
                                        onChange={this.handlerChange}
                                        disabled={filter.notAssign}
                                    />
                                </div>
                                <div className="fieldDescription">
                                    <span>Contract End</span>
                                    <input
                                        type="date"
                                        name="contractEndDate"
                                        value={filter.contractEndDate}
                                        onChange={this.handlerChange}
                                        disabled={filter.notAssign}/>
                                </div>
                            </div>
                            <div className="otherFilters">
                                <div className="fieldDescription">
                                    <span>Login Start</span>
                                    <input type="date"
                                           name="createAtStart"
                                           value={filter.createAtStart}
                                           onChange={this.handlerChange}/>
                                </div>
                                <div className="fieldDescription">
                                    <span>Login End</span>
                                    <input type="date"
                                           name="createAtEnd"
                                           value={filter.createAtEnd}
                                           onChange={this.handlerChange}/>
                                </div>
                            </div>
                            <div className="checkbox">
                                <label htmlFor="notAssign">Not Assigned</label>
                                <input type="checkbox" name="notAssigned" id="notAssign"
                                       onClick={this.handlerChangeCheckbox} checked={filter.notAssign}/>
                            </div>
                        </div>
                    </div>
                    <div className="searchPart">
                        <input type="text" name="search" placeholder="Search" className="searchInput"
                               onKeyPress={this.searchInputPressedHandler}/>
                    </div>
                    <div className="selectSize">
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '0 10px'
                        }}>
                            <p style={{textAlign: 'left'}}>Results
                                count {this.props.usersCount}</p>
                            <h3>Row Count</h3>
                            <Button variant="contained" color="primary" className="outlineBtn" onClick={() => {
                                this.openSendNotificationsModal()
                            }}>Notify</Button>
                        </div>
                        <select className="selectOption"
                                name="rowCount"
                                value={this.state.itemsCount}
                                onChange={this.onChange}>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='50'>50</option>
                        </select>
                    </div>
                </div>
                {popupContent}
                {
                    usersLoading ?
                        (<div className="loading">
                            <img src="/public/images/loading.gif"/>
                        </div>) :
                        (<table className="usersTable">
                            <thead>
                            <tr>
                                <th onClick={() => this.columnOnChange('name')}>
                                    Name
                                    {filter.orderBy === 'name' ? filter.dec ? (<span><b>&#x2191;</b></span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('surname')}>
                                    Surname
                                    {filter.orderBy === 'surname' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('username')}>
                                    Card Number
                                    {filter.orderBy === 'username' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('balance')}>
                                    Balance
                                    {filter.orderBy === 'balance' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('agent')}>
                                    Agent
                                    {filter.orderBy === 'agent' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('note')}>
                                    Notes
                                    {filter.orderBy === 'note' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('createAt')}>
                                    Registration Date
                                    {filter.orderBy === 'createAt' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}
                                </th>
                                <th onClick={() => this.columnOnChange('removed')}>Enable/Disable
                                    {filter.orderBy === 'removed' ? filter.dec ? (<span>&#x2191;</span>) : (
                                        <span>&#x2193;</span>) : ''}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                (() => {
                                    const renderUsers = [];
                                    for (let i = 0; i < Math.min(parseInt(filter.limit), users.length); i++) {
                                        renderUsers.push((
                                            <tr key={users[i]._id}>
                                                <td><Link to={`/dashboard/user/${users[i]._id}`}>{users[i].name}</Link>
                                                </td>
                                                <td><Link
                                                    to={`/dashboard/user/${users[i]._id}`}>{users[i].surname}</Link>
                                                </td>
                                                <td>{users[i].username}</td>
                                                <td>{Math.round(users[i].balance * 100) / 100}</td>
                                                <td>{users[i].agent ? (users[i].agent.name + " " + users[i].agent.surname) : '------'}</td>
                                                <td>{users[i].note}</td>
                                                <td>{new Date(users[i].createAt).toLocaleString()}</td>
                                                <td>
                                                    <div className="can-toggle can-toggle--size-small">
                                                        <input id={`switcher${users[i]._id}`} type="checkbox"
                                                               onChange={(e) => {
                                                                   this.toggleDisableUser(e, users[i]._id)
                                                               }} checked={!users[i].removed}/>
                                                        <label htmlFor={`switcher${users[i]._id}`}>
                                                            <div className="can-toggle__switch" data-checked="on"
                                                                 data-unchecked="off"/>
                                                        </label>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    return renderUsers;
                                })()
                            }
                            </tbody>
                        </table>)
                }
                {
                    ifPagination && (
                        <Pagination
                            activePage={this.state.activePage}
                            itemsCountPerPage={this.state.itemsCount}
                            totalItemsCount={this.props.usersCount}
                            pageRangeDisplayed={5}
                            onChange={this.paginationOnChange}
                            prevPageText='<'
                            nextPageText='>'
                        />
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        users: store.users.data,
        providers: store.shop.providers,
        agents: store.cards.agents,
        usersLoading: store.users.loading,
        usersCount: store.users.count,
    };
}
const mapDispatchToProps = dispatch => {
    return {
        GetUsers: (filter) => dispatch(GetUsers(filter)),
        GetProviders: () => dispatch(GetProviders()),
        GetAgents: () => dispatch(GetAgents()),
        SendNotificationToUser: (filter) => dispatch(SendNotificationToUser(filter)),
        ToggleDisableUser: (userId) => dispatch(ToggleDisableUser(userId)),
    };
};

Users.propTypes = {
    GetUsers: propTypes.func.isRequired,
    GetProviders: propTypes.func.isRequired,
    GetAgents: propTypes.func.isRequired,
    SendNotificationToUser: propTypes.func.isRequired,
    ToggleDisableUser: propTypes.func.isRequired,
    users: propTypes.arrayOf(propTypes.any).isRequired,
    providers: propTypes.arrayOf(propTypes.any).isRequired,
    agents: propTypes.arrayOf(propTypes.any).isRequired,
    usersLoading: propTypes.bool.isRequired,
    usersCount: propTypes.number.isRequired,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Users));
