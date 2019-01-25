/*
    ./client/components/App.jsx
*/

import React from 'react';


import { connect } from 'react-redux';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Row, Container, Col, Alert } from 'reactstrap';

import { Translator, Enums } from './../../../../../Shared/index.js';
import { LANGUAGE_ACTIONS, NOTIFICATIONS_ACTIONS } from './../../../../App/index.js';

import { CSSTransitionGroup } from 'react-transition-group';

import { Link } from 'react-router-dom';

class Notification extends React.Component {

    constructor() {
        super();

    }


    onDismiss(event) {

        this.props.removeNotification(event.target.getAttribute('data-tag'));
    }
    init() {
        this.tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    }
    closeAll() {
        this.props.notification.map((item, index) => {
            this.props.removeNotification(this.props.removeNotification.length-1);
        });

    }
    render() {
        this.init();

        let body = <div></div>;
        if (this.props.notification.length > 0) {
            body = (<div>
                <div className="background-alert" onClick={this.closeAll.bind(this)}>

                </div>
                <div className="alert-absolute" >
                    <CSSTransitionGroup transitionName="fade"
                        transitionAppear={true}
                        transitionAppearTimeout={500}

                    >
                        {this.props.notification.map((item, index) => {
                            let color = '';

                            let icon = '';
                            let header='';
                            if (item.type == Enums.CODE.ERROR_GLOBAL) {
                                color = "danger";
                                icon = "fa fa-minus-circle";
                                header='ERROR';
                            }else  if (item.type == Enums.CODE.INFO_GLOBAL) {
                                color = "info";
                                icon = "fa fa-info-circle";
                                header='INFO';
                            }
                            else if (item.type == Enums.CODE.WARNING_GLOBAL) {
                                color = "warning ";
                                icon = "fa fa-exclamation-triangle";
                                header='WARNING';
                            }
                            else if (item.type == Enums.CODE.SUCCESS_GLOBAL) {
                                color = "success ";
                                icon = "fa fa-check-circle-o";
                                header='SUCCESS';
                            }
                            return (<Alert color={color} className=" rounded-0 text-center" key={index} onClick={this.onDismiss.bind(this)} >
                                <button data-tag={index} type="button" class="close" aria-label="Close">
                                    <span data-tag={index} aria-hidden="true">×</span>
                                </button>

                                <strong><i class={icon}></i> {header}</strong><br /><br/>
                                {" " + item.message[this.props.lang]}

                            </Alert>)
                        })}
                    </CSSTransitionGroup>
                </div>

            </div>);
        }
        return body



    }
}
// class="alert alert-danger alert-dismissible fade show alert-absolute text-center  u-shadow-v11 pointer rounded-0" data-dismiss="alert" role="alert" key={index}>
const mapStateToProps = (state) => {

    return {

        lang: state.LanguageReducer,
        codeDict: state.DictionaryReducer,
        notification: state.NotificationReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeNotification: (data) => {
            dispatch({
                type: NOTIFICATIONS_ACTIONS.REMOVE_NOTIFICATION_GLOBAL,
                notification: data
            });

        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Notification);