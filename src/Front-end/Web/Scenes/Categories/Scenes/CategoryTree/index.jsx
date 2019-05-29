/*
    ./client/components/App.jsx
*/

import React from 'react';

import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row, ListGroup, ListGroupItem, Badge } from 'reactstrap';

import { connect } from 'react-redux';

import { DictionaryDTO, Enums, CommandList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { Link } from 'react-router-dom';
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import QueryList from '../../../../../../Shared/QueryList.js';
import LinkAuth from '../../../../Components/LinkAuth/index.jsx';
import ScrollArea from 'react-scrollbar';



class CategoryTree extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            treeData: [

            ]
        };
    }
    list_to_tree(list) {
        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].category_child_id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            if (node.category_parent_id !== null) {
                // if you have dangling branches check that map[node.parentId] exists
                list[map[node.category_parent_id]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    }
    componentWillMount() {
        this.props.getAllCategories().then(succ => {
            console.log(succ.data);
            let verified = succ.data.filter(item => {
                return item.status == 1;
            });
            let notVerified = succ.data.filter(item => {
                return item.tatus == 0;
            });
            let resultVer = this.list_to_tree(verified.map(item => {
                item.subtitle = (<span class="g-letter-spacing-1">
                    {item.forEvent == true ? "EVENT " : ""}
                    {item.forSell == true ? "SELL " : ""}
                    {item.forThing == true ? "THING" : ""}

                </span >)
                return item;
            }))
            let resultNotVer = this.list_to_tree(notVerified.map(item => {
                item.subtitle = (<span class="g-letter-spacing-1">
                    {item.forEvent == true ? "EVENT " : ""}
                    {item.forSell == true ? "SELL " : ""}
                    {item.forThing == true ? "THING" : ""}

                </span >)

                return item;
            }))
            let result = [{
                title: "VERIFIED",
                children: resultVer
            },
            {
                title: "NOT_VERIFIED",
                children: resultNotVer
            },
            ]
            this.setState({
                treeData: result
            })
        })
    }
    render() {
        return (
            <ScrollArea
            horizontal={true}
            style={{height:'800px',width:'400px'}}>

                <SortableTree
                    isVirtualized={false}
                    rowHeight={50}
                    style={{  display: 'block' }}
                    treeData={this.state.treeData}
                    onChange={treeData => { this.setState({ treeData }) }}
                    onMoveNode={(element) => {
                        //console.log(element); console.log('dupaaa')
                        if (element.nextParentNode && element.nextParentNode.category_child_id != element.node.category_parent_id) {
                            element.node.toSave = true;
                        }
                        return element
                    }}
                    canDrop={element => {
                        if (!element.nextParent || element.nextParent.title == 'NOT_VERIFIED') {
                            return false;
                        }
                        return true;
                    }}
                    //    nodeContentRenderer={CategoryTreeElement}
                    generateNodeProps={(item) => {
                        item.node.title = (
                            // <LinkAuth to={`/categories/edit/${item.node.category_child_id}`} className="dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">{item.node.title}</LinkAuth>
                            item.node.title
                        )
                        item.buttons = []


                        if (item.node.toSave == true) {


                            item.buttons.push(
                                <LinkAuth to={`/categories/edit/${item.node.category_child_id}`} className="g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                    <i class="fa fa-floppy-o" aria-hidden="true"></i>
                                </LinkAuth>)
                        }
                        item.buttons.push(
                            <LinkAuth to={`/categories/edit/${item.node.category_child_id}`} className="g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            </LinkAuth>
                        )
                        item.buttons.push(
                            <LinkAuth to={`/categories/add/${item.node.category_child_id}`} className="g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                <i class="fa  fa-plus"></i>
                            </LinkAuth>)
                        item.buttons.push(
                            <LinkAuth to={`/categories/add/${item.node.category_child_id}`} className="g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                <i class="fa  fa-close"></i>
                            </LinkAuth>)



                        return item;
                    }}
                />
            </ScrollArea>
        );
    }
}




const mapStateToProps = (state) => {

    return {


        codeList: state.DictionaryReducer,
        lang: state.LanguageReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => {
            return dispatch(new BaseService().commandThunt(QueryList.Category.GET_CATEGORIES_ALL_TREE, {}))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryTree);