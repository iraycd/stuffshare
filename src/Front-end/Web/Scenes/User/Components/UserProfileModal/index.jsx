/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Enums, CommandList, Translator } from '../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
//import { TextBox, DropDownList, ButtonLoader } from './../../Components/index.js';
import UserLoginInternalDTO from '../../../../../../Shared/DTO/User/UserLoginInternalDTO.js';
import Modal from 'react-responsive-modal'
import ForgotPassword from '../../Scenes/ForgotPassword/index.jsx';
import Register from '../../Scenes/Register/index.jsx';
import Login from '../../Scenes/Login/index.jsx';


import { CSSTransitionGroup } from 'react-transition-group';
import logo from './../../../../assets/img/logo/logo-2.png';
import UserProfileInfo from '../../Scenes/UserProfileInfo/index.jsx'
import QueryList from '../../../../../../Shared/QueryList.js';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';



class UserProfileModal extends React.Component {

    constructor() {
        super();
        this.state = new UserLoginInternalDTO();
        this.state.validation = [];
        this.open = false;
        this.toggle = this.toggle.bind(this);
        this.state.activeTab = '1';

    }

    onOpenModal() {
        this.setState({ open: true });
    };

    onCloseModal() {
        this.props.closeWindow();
    };
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);

        this.open = false;

    }
    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


        let modalBody = <div></div>;


        let body =
            <div>
                <Nav tabs>
                    <NavItem>
                        <NavLink className="active"
                            onClick={() => { this.toggle('1'); }}
                        >
                            USER PANEL
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            ITEMS
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            MESSAGES
            </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            onClick={() => { this.toggle('2'); }}
                        >
                            FRIENDS
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <UserProfileInfo></UserProfileInfo>
                    </TabPane>
                </TabContent>
            </div >;
        return (

            body

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        user: state.UserReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginInternal: (dto) => {
            dispatch(new BaseService().commandThunt(QueryList.User.LOG_IN_INTERNAL, dto));
        },
        changeAction: (open, action) => {
            dispatch({
                type: USER_ACTIONS.OPEN_MODAL,
                dto: {
                    open: open,
                    action: action
                }
            });
        },
        closeWindow: () => {
            dispatch({
                type: USER_ACTIONS.CLOSE_MODAL,
                dto: {
                    open: false,
                }
            });
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserProfileModal);