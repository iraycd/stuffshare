import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';

class BodyLoader extends React.Component {

    constructor(props) {
        super(props);

    }


    render() {

        // <div id="loading-text">LOADING <br />{this.props.progress + "%"}</div>

        return <Container className="loader" style={{ height: this.props.height }}>
            <div id="loading-content" className="loading-content-body" style={{ height: this.props.size, width: this.props.size }}></div>
        </Container>
    }
}

export default BodyLoader;
