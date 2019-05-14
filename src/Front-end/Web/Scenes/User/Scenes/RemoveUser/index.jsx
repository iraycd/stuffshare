/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, TabPane, TabContent, Nav, NavItem, NavLink } from 'reactstrap';
import { Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { USER_ACTIONS } from '../../../../../App/Reducers/User/actions.js';
import { CSSTransitionGroup } from 'react-transition-group';
import logo from './../../../../assets/img/logo/logo-2.png';
import CommandList from '../../../../../../Shared/CommandList.js';

class RemoveUser extends React.Component {

    constructor() {
        super();
        this.state = {};
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
    removeAccounts() {
        this.props.removeAccounts();
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token")

    }
    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);


        let modalBody = <div></div>;


        let body =
            <div className="text-center">
                <Form className=" g-min-height-600 g-brd-around g-brd-gray-light-v3 g-pa-30 g-mb-10 text-center">
                    <Col className="text-center mx-auto g-mb-10">
                        <h5 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('REMOVE_USER_HEADER')}</h5>
                        <br />
                        <Label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20">{tran.translate('REMOVE_USER_TEXT_HEADER')}</Label>

                    </Col>

                    <ButtonLoader onClick={this.removeAccounts.bind(this)} size={"md"} className={"btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase"} value={tran.translate('REMOVE_ACCOUNT_BUTTON_LABEL')} />

                </Form>
            </div>
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
        user: state.UserReducer,
        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {

        removeAccounts: () => {
            dispatch(
                new BaseService().commandThunt(CommandList.User.REMOVE_USER, {}, localStorage.token)
            )
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RemoveUser);