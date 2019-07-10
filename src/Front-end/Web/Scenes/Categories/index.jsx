/*
    ./client/components/App.jsx
*/

import React from 'react';
import { Switch } from 'react-router-dom';
import { CSSTransitionGroup } from 'react-transition-group';
import { Col, Container, Row } from 'reactstrap';
import RouterAuth from '../../Components/RouterAuth/index.jsx';
import AddCategory from './Scenes/AddCategory/index.jsx';
//import DictionaryEdit from './Scenes/Edit/index.jsx';
import CategoryTree from './Scenes/CategoryTree/index.jsx';
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
                        <Col xs="4">
                            <CategoryTree />
                        </Col>
                        <Col xs="8">
                            <Switch>

                                <RouterAuth exact={true} path={"/categories/edit/:id"} component={EditCategory} />
                                <RouterAuth exact={true} path={"/categories/add/:status/:parentId"} component={AddCategory} />

                            </Switch>
                        </Col>

                    </Row>
                </Container>
            </CSSTransitionGroup>
        );
    }
}
