/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import Modal from 'react-responsive-modal'
import { CSSTransitionGroup } from 'react-transition-group';
import MODAL_ACTIONS from './actions.js';
import { BrowserRouter, NavLink, Switch } from 'react-router-dom';


class LinkAuth extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {

        if (this.props.auth.is_logged == true) {
            return (
                <NavLink exact={this.props.exact}
                    strict={this.props.strict}
                    to={this.props.to} className={this.props.className}>
                    {this.props.children}
                </NavLink>
            );
        } else {
            return <span class="hidden"></span>
        }

    }
}


const mapStateToProps = (state) => {

    return {

        auth: state.AuthReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {



    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LinkAuth);