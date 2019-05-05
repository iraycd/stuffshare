/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import Modal from 'react-responsive-modal'
import { CSSTransitionGroup } from 'react-transition-group';
import MODAL_ACTIONS from './actions.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'


class RouterAuth extends React.Component {

    constructor(props) {
        super(props);

    }



    render() {

        console.log(this.props)
        if (this.props.auth.is_logged == true) {
            return (
                <Route path={this.props.path} component={this.props.component} />


            );
        } else {
            return <Redirect to={'/login?redirectTo=' + encodeURIComponent(this.props.location.pathname)} />;
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
)(RouterAuth);