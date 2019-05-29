/*
    ./client/components/App.jsx
*/

import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Route, Switch } from 'react-router-dom'
//import DictionaryEdit from './Scenes/Edit/index.jsx';
import CategoryTree from './Scenes/CategoryTree/index.jsx'
import { CSSTransitionGroup } from 'react-transition-group';
import RouterAuth from '../../Components/RouterAuth/index.jsx';
import EditCategory from './Scenes/EditCategory/index.jsx';




export default class Categories extends React.Component {

    constructor() {
        super();

    }
    render() {
        return (
            <CSSTransitionGroup transitionName="fade"
                transitionAppear={true}
                transitionAppearTimeout={500}
            >
                <Container style={{ minWidth: '90vw' }} className="g-pa-30 g-mb-30">
                    <Row>
                        <Col>
                            <CategoryTree />
                        </Col>
                        <Col>
                            <RouterAuth path={"/category/edit/:id"} component={EditCategory} />
                        </Col>

                    </Row>
                </Container>
            </CSSTransitionGroup>
        );
    }
}
