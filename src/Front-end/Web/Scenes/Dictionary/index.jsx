/*
    ./client/components/App.jsx
*/

import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';
import { Col, Container, Row } from 'reactstrap';
import DictionaryEdit from './Scenes/Edit/index.jsx';
import DictionaryList from './Scenes/List/index.jsx';


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
