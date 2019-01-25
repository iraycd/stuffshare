/*
    ./client/components/App.jsx
*/

import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
import DictionaryEdit from './scenes/Edit/index.jsx';

import { CSSTransitionGroup } from 'react-transition-group';
import DictionaryList from './scenes/List/index.jsx';
export default class Dictionary extends React.Component {

    constructor() {
        super();

    }
    render() {
        return (
            <CSSTransitionGroup transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
                <Container className="g-pa-30 g-mb-30">
                    <Row>
                        <Col xs="4">
                            <DictionaryList />
                        </Col>
                        <Col xs="8">
                            <DictionaryEdit />
                        </Col>
                    </Row>
                </Container>
            </CSSTransitionGroup>
        );
    }
}
