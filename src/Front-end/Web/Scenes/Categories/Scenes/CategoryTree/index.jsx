/*
    ./client/components/App.jsx
*/

import React from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { connect } from 'react-redux';
import SortableTree from "react-sortable-tree";
import 'react-sortable-tree/style.css'; // This only needs to be imported once in your app
import { Col, Input } from 'reactstrap';
import QueryList from '../../../../../../Shared/QueryList.js';
import LinkAuth from '../../../../Components/LinkAuth/index.jsx';
import { CommandList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';





class CategoryTree extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            treeData: [{ title: 'src/', category: " ", children: [{ title: 'index.js', category: " " }] }],
            loading: false,
            categories: [],
            search: ""
        };
    }
    componentWillReceiveProps(next) {
        if (next.categoryTree.categories.length > 0 && next.categoryTree.isLoading == false) {
            console.log('update');
            let verified = next.categoryTree.categories.filter(item => {
                return item.status == 1;
            });
            let notVerified = next.categoryTree.categories.filter(item => {
                return item.status == 0;
            });
            let resultVer = this.list_to_tree(verified.map(item => {
                item.subtitle = (<span class="g-letter-spacing-1">
                    {item.forEvent == true ? "EVENT " : ""}
                    {item.forSell == true ? "SELL " : ""}
                    {item.forThing == true ? "THING" : ""}

                </span >
                )
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
                title: "_VERIFIED",
                category: "_VERIFIED",
                status: 1,
                forEvent: true,
                forSell: true,
                forThing: true,
                expanded: verified.filter(item => { return item.expanded == true }).length > 0 ? true : false,
                children: resultVer
            },
            {
                title: "_NOT_VERIFIED",
                category: "_NOT_VERIFIED",
                forEvent: true,
                forSell: true,
                forThing: true,
                status: 0,
                expanded: notVerified.filter(item => { return item.expanded == true }).length > 0 ? true : false,
                children: resultNotVer
            },
            ]

            this.setState({
                categories: next.categoryTree.categories,
                treeData: result
            })
        }
    }
    list_to_tree(list) {

        var map = {}, node, roots = [], i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].category_child_id] = i; // initialize the map
            list[i].children = []; // initialize the children
        }
        for (i = 0; i < list.length; i += 1) {
            try {
                node = list[i];
                if (node.category_parent_id !== null) {
                    // if you have dangling branches check that map[node.parentId] exists
                    list[map[node.category_parent_id]].children.push(node);
                } else {
                    roots.push(node);
                }
            } catch (exception) {
                console.log(list[i])
                console.log(exception)
            }
        }
        return roots;
    }


    setParent(event) {
        let id = event.currentTarget.getAttribute('data-tag');
        let parentId = event.currentTarget.getAttribute('data-parent-tag');;
        let status = event.currentTarget.getAttribute('data-status');;


        //if (parentId) {
        let dto = {
            "id": id,
            "status": status,
            "CategoryHierarchy": {
                "category_parent_id": parentId
            }
        }
        this.props.setParent(dto)

    }
    removeCategory(event) {
        let id = event.currentTarget.getAttribute('data-tag')
        let name = event.currentTarget.getAttribute('data-name')

        console.log(id)
        event.preventDefault();
        this.setState(
            {
                loading: true
            }
        )
        confirmAlert({
            onClickOutside: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            onKeypressEscape: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            customUI: ({ onClose }) => {
                return (
                    <div className='g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center'>
                        <h1 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_REMOVE_TEXT_CONFIRM_HEADER')}</h1>
                        <p className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_REMOVE_CONFIRM_HEADER') + " "} <strong>{name}</strong></p>
                        <button className="btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
                            onClick={() => {
                                this.props.removeElements(id)
                                onClose();
                            }}
                        >
                            {Translator(this.props.codeList.data.LABEL, this.props.lang).translate('YES_LABEL')}
                        </button>
                        <button className="g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md" onClick={() => {
                            this.setState(
                                {
                                    loading: false
                                }
                            )
                            onClose()
                        }}>{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('NO_LABEL')}</button>

                    </div>
                );
            }

        });

    };
    toVerifyClick(event) {
        let id = event.currentTarget.getAttribute('data-tag');
        let name = event.currentTarget.getAttribute('data-name');
        let spamId = this.state.categories.filter(item => {
            return item.category == '_TO_DO'
        })[0];
        console.log(spamId.category_child_id);
        confirmAlert({
            onClickOutside: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            onKeypressEscape: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            customUI: ({ onClose }) => {
                return (
                    <div className='g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center'>
                        <h1 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_CHECK_TEXT_CONFIRM_HEADER')}</h1>
                        <p className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_CHECK_CONFIRM_HEADER') + " "} <strong>{name}</strong></p>
                        <button className="btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
                            onClick={() => {
                                let dto = {
                                    "id": id,
                                    "status": 1,
                                    "CategoryHierarchy": {
                                        "category_parent_id": null
                                    }
                                }
                                this.props.setParent(dto)
                                onClose();
                            }}
                        >
                            {Translator(this.props.codeList.data.LABEL, this.props.lang).translate('YES_LABEL')}
                        </button>
                        <button className="g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md" onClick={() => {
                            this.setState(
                                {
                                    loading: false
                                }
                            )
                            onClose()
                        }}>{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('NO_LABEL')}</button>

                    </div>
                );
            }

        });
    }
    toDoClick(event) {
        let id = event.currentTarget.getAttribute('data-tag');
        let name = event.currentTarget.getAttribute('data-name');
        let spamId = this.state.categories.filter(item => {
            return item.category == '_TO_DO'
        })[0];
        console.log(spamId.category_child_id);
        confirmAlert({
            onClickOutside: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            onKeypressEscape: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            customUI: ({ onClose }) => {
                return (
                    <div className='g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center'>
                        <h1 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_TO_DO_TEXT_CONFIRM_HEADER')}</h1>
                        <p className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_TO_DO_CONFIRM_HEADER') + " "} <strong>{name}</strong></p>
                        <button className="btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
                            onClick={() => {
                                let dto = {
                                    "id": id,
                                    "status": 0,
                                    "CategoryHierarchy": {
                                        "category_parent_id": spamId.category_child_id
                                    }
                                }
                                this.props.setParent(dto)
                                onClose();
                            }}
                        >
                            {Translator(this.props.codeList.data.LABEL, this.props.lang).translate('YES_LABEL')}
                        </button>
                        <button className="g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md" onClick={() => {
                            this.setState(
                                {
                                    loading: false
                                }
                            )
                            onClose()
                        }}>{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('NO_LABEL')}</button>

                    </div>
                );
            }

        });
    }
    toSpamClick(event) {
        let id = event.currentTarget.getAttribute('data-tag');
        let name = event.currentTarget.getAttribute('data-name');
        let spamId = this.state.categories.filter(item => {
            return item.category == '_SPAM'
        })[0];
        console.log(spamId.category_child_id);
        confirmAlert({
            onClickOutside: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            onKeypressEscape: () => {
                this.setState(
                    {
                        loading: false
                    }
                )
            },
            customUI: ({ onClose }) => {
                return (
                    <div className='g-py-40 g-brd-around rounded-0 g-brd-gray-light-v3 g-bg-white-opacity-0_8 g-px-50 text-center'>
                        <h1 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_TO_SPAM_TEXT_CONFIRM_HEADER')}</h1>
                        <p className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('CATEGORY_TREE_TO_SPAM_CONFIRM_HEADER') + " "} <strong>{name}</strong></p>
                        <button className="btn g-mr-5 g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md"
                            onClick={() => {
                                let dto = {
                                    "id": id,
                                    "status": 0,
                                    "CategoryHierarchy": {
                                        "category_parent_id": spamId.category_child_id
                                    }
                                }
                                this.props.setParent(dto)
                                onClose();
                            }}
                        >
                            {Translator(this.props.codeList.data.LABEL, this.props.lang).translate('YES_LABEL')}
                        </button>
                        <button className="g-ml-5 btn g-brd-none u-btn-primary rounded-0 g-letter-spacing-1 g-font-weight-700 g-font-size-12 text-uppercase btn btn-secondary btn-md" onClick={() => {
                            this.setState(
                                {
                                    loading: false
                                }
                            )
                            onClose()
                        }}>{Translator(this.props.codeList.data.LABEL, this.props.lang).translate('NO_LABEL')}</button>

                    </div>
                );
            }

        });
    }
    //componentWillMount() {
    //   this.renderTree();
    //}
    componentDidMount() {
        this.props.getAllCategories()
    }
    searchHandler(event) {
        let search = event.target.value;
        this.setState({
            search: search
        });

    }
    render() {


        return (
            // <ScrollArea
            //     horizontal={true}
            //    style={{ height: 'auto', width: '400px' }}>
            <Col>
                <Input placeholder={"Filter"} isRequired={true} value={this.state.search} onChange={this.searchHandler.bind(this)} field="message.es" validation={this.state.validation} />

                <SortableTree
                    rowHeight={55}
                    style={{ height: '800px' }}
                    treeData={this.state.treeData}
                    onChange={treeData => { this.setState({ treeData }) }}
                    onMoveNode={(element) => {
                        //console.log(element); console.log('dupaaa')
                        if (element.nextParentNode && element.nextParentNode.category_child_id != element.node.category_parent_id) {

                            element.node.toSave = true;
                        }
                        return element
                    }}
                    /*     canDrop={element => {
                             if (!element.nextParent || element.nextParent.category == '_NOT_VERIFIED') {
                                 return false;
                             }
                             return true;
                         }}*/
                    searchQuery={this.state.search}
                    onlyExpandSearchedNodes={true}
                    canDrag={(node) => {
                        if (['_SPAM', "_NOT_VERIFIED", "_VERIFIED", "_TO_DO"].includes(node.node.category)) {
                            return false;
                        }
                        return true;
                    }}
                    canDrop={(node) => {
                        console.log('canDrop')
                        console.log(node);
                        if ((node.nextParent.forEvent == node.node.forEvent || node.nextParent.forEvent == true)
                            && (node.nextParent.forSell == node.node.forSell || node.nextParent.forSell == true)
                            && (node.nextParent.forThing == node.node.forThing || node.nextParent.forThing == true)) {
                            return true;
                        }
                        return false;
                    }}
                    //    nodeContentRenderer={CategoryTreeElement}
                    generateNodeProps={(item) => {
                        item.node.title = (
                            item.node.category.startsWith('_') ? <span className="g-color-gray-dark-v4">{item.node.icon ? <i className={item.node.icon}></i> : <span></span>}<span className="g-px-10">{item.node.category}</span></span> :
                                <span>{item.node.icon ? <i className={item.node.icon}></i> : <span></span>}<LinkAuth to={`/categories/edit/${item.node.category_child_id}`} className=" g-pl-7--hover text-uppercase   u-link-v5 g-font-weight-600 g-py-0 g-mx-10  g-color-gray-dark-v4 g-font-size-12 g-color-primary--hover">{item.node.category}</LinkAuth></span>
                        )
                        item.buttons = [];
                        item.buttons.push(
                            <LinkAuth to={`/categories/add/${item.node.status}/${item.node.category_child_id}`} className="g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                <i class="fa  fa-plus"></i>
                            </LinkAuth>)
                        if (!['_SPAM', "_NOT_VERIFIED", "_VERIFIED", "_TO_DO"].includes(item.node.category)) {
                            if (item.node.toSave == true) {
                                item.buttons.push(

                                    <span data-status={item.parentNode.status} data-parent-tag={item.parentNode.category_child_id} data-tag={item.node.category_child_id} data-name={item.node.title} onClick={this.setParent.bind(this)} className="g-cursor-pointer g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                        <i class="fa fa-floppy-o"></i>
                                    </span>)
                            }
                            if (item.node.status == 1) {
                                item.buttons.push(
                                    <span data-tag={item.node.category_child_id} data-name={item.node.category} onClick={this.toDoClick.bind(this)} className="g-cursor-pointer g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                        <i class="fa fa-exclamation-triangle"></i>
                                    </span>)
                            }
                            if (item.node.status == 0) {
                                item.buttons.push(
                                    <span data-tag={item.node.category_child_id} data-name={item.node.category} onClick={this.toVerifyClick.bind(this)} className="g-cursor-pointer g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                        <i class="fa fa-check-square"></i>
                                    </span>)
                            }

                            item.buttons.push(
                                <span data-tag={item.node.category_child_id} data-name={item.node.category} onClick={this.toSpamClick.bind(this)} className="g-cursor-pointer g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                    <i class="fa  fa-trash"></i>
                                </span>)
                            item.buttons.push(
                                <span data-tag={item.node.category_child_id} data-name={item.node.category} onClick={this.removeCategory.bind(this)} className="g-cursor-pointer g-mx-5 dropdown-item u-link-v5 g-font-weight-500 nav-link g-py-0 g-px-0  g-font-size-12 g-color-primary--hover">
                                    <i class="fa  fa-close"></i>
                                </span>)



                        }

                        return item;
                    }}
                />
            </Col >

        );
    }
}




const mapStateToProps = (state) => {

    return {


        codeList: state.DictionaryReducer,
        lang: state.LanguageReducer,
        categoryTree: state.CategoryTreeReducer
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories: () => {
            return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_ALL_TREE, {}))
        },
        removeElements: (id) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category.DELETE_CATEGORY, { id: id }))

        },
        setParent: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category.SET_PARENT, dto))

        }
        , setNotification: (type, message) => {
            dispatch({ type: CATEGORY_TREE_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }


    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryTree);