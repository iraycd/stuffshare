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
import CategoryOptionsListByType from './Scenes/CategoryOptionsListByType/index.jsx';
import CategoryOptionTempMapper from './Components/CategoryOptionTempMapper/CategoryOptionTempMapper.jsx';





export default class CategoryOptions extends React.Component {

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
                            <CategoryOptionsListByType />
                        </Col>
                        <Col xs="8" className="g-brd-around g-brd-gray-light-v4 g-pa-30 g-mb-10 ">
                            <CategoryOptionTempMapper ></CategoryOptionTempMapper>
                        </Col>

                    </Row>
                </Container>
            </CSSTransitionGroup>
        );
    }
}
