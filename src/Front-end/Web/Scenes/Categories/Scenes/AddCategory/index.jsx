/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { DictionaryDTO, Enums, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import { withRouter } from 'react-router-dom';
import translate from 'translate';
import CategoryDTO from '../../../../../../Shared/DTO/Categories/CategoryDTO.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import Checkbox from '../../../../Components/FormComponent/Components/Checkbox/index.jsx';
import IconTextbox from '../../../../Components/FormComponent/Components/IconTextbox/index.jsx';
import CommandList from '../../../../../../Shared/CommandList.js';
import uuidv4 from "uuid/v4";
import CATEGORY_TREE_ACTIONS from '../CategoryTree/actions.js';




class AddCategory extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
        this.state.category = new CategoryDTO();
        //        this.state.category = new CategoryDTO();
        this.state.parentCategory = new CategoryDTO();
        this.state.category.category_parent = [];
        this.state.category.category_children = [];

        this.state.validation = [];
    }
    componentWillReceiveProps(next) {
        if (next.match.params.parentId != this.props.match.params.parentId || next.match.params.status != this.props.match.params.status) {
            if (next.match.params.parentId != "undefined") {
                this.props.getCategories(next.match.params.parentId).then(succ => {
                    console.log(succ.data);
                    let cat = new CategoryDTO();
                    cat.id = uuidv4();

                    cat.forEvent = succ.data[0].forEvent;
                    cat.forSell = succ.data[0].forSell;
                    cat.forThing = succ.data[0].forThing;
                    cat.icon = succ.data[0].icon;
                    cat.status = succ.data[0].status;

                    cat.category_parent = succ.data;
                    cat.category_children = [];
                    cat.CategoryHierarchy = {
                        category_parent_id: next.match.params.parentId
                    }
                    this.setState({
                        parentCategory: succ.data[0],
                        category: cat

                    })

                })
            }
            let cat = new CategoryDTO();

            cat.id = uuidv4();
            cat.category_parent = [];
            cat.category_children = [];
            cat.forEvent = 1;
            cat.forSell = 1;
            cat.forThing = 1;
            cat.status = next.match.params.status;
            cat.CategoryHierarchy = {
                category_parent_id: ""
            }
            this.setState({
                category: cat
            });
        }

    }
    componentDidMount() {
        if (this.props.match.params.parentId != "undefined") {

            this.props.getCategories(this.props.match.params.parentId).then(succ => {
                console.log(succ.data);
                let cat = new CategoryDTO();
                cat.id = uuidv4();

                cat.forEvent = succ.data[0].forEvent;
                cat.forSell = succ.data[0].forSell;
                cat.forThing = succ.data[0].forThing;
                cat.icon = succ.data[0].icon;
                cat.status = succ.data[0].status;

                cat.category_parent = succ.data;
                cat.category_children = [];
                cat.CategoryHierarchy = {
                    category_parent_id: this.props.match.params.parentId
                }
                this.setState({
                    parentCategory: succ.data[0],
                    category: cat

                })

            })
        }
        let cat = new CategoryDTO();

        cat.id = uuidv4();
        cat.category_parent = [];
        cat.category_children = [];
        cat.forEvent = 1;
        cat.forSell = 1;
        cat.forThing = 1;
        cat.status = this.props.match.params.status
        cat.CategoryHierarchy = {
            category_parent_id: ""
        }
        this.setState({
            category: cat
        });


    }

    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                //          this.validation();
            });
        }
    }

    validation() {
        let validation = DictionaryDTO.prototype.validation(this.state);
        this.tran = Translator(this.props.codeDict.data.VALIDATION, this.props.lang);
        validation.map((item) => {
            item.msg = this.tran.translate(item.failed, ...item.value);

        });
        this.setState({
            validation: validation
        });
        return validation;
    }

    submitHanlder(event) {
        this.state.toRefresh = true;


        event.preventDefault();
        //   if (this.validation().length == 0) {
        // this.props.code=this.state;

        this.props.addCategories(this.state.category).then(succ => {
            this.props.history.push(`/categories/edit/${this.state.category.id}`);
            this.props.setNotification(Enums.CODE.SUCCESS_GLOBAL,
                Translator(this.props.codeDict.data.SUCCESS_GLOBAL, this.props.lang).translate('CATEOGRY_HAS_BEEN_ADDED_SUCCESS')
            )

        });

        //   }
    }
    esHandler(event) {
        const cat = this.state.category;
        cat.category_es = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    noHandler(event) {
        const cat = this.state.category;
        cat.category_no = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    plHandler(event) {
        const cat = this.state.category;
        cat.category_pl = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    zhcnHandler(event) {
        const cat = this.state.category;
        cat.category_zh_cn = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    frHandler(event) {
        const cat = this.state.category;
        cat.category_fr = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    ruHandler(event) {
        const cat = this.state.category;
        cat.category_ru = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    usHandler(event) {
        const cat = this.state.category;
        cat.category_us = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    catHandler(event) {
        const cat = this.state.category;
        cat.category = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    iconHandler(event) {
        const cat = this.state.category;
        cat.icon = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    deHandler(event) {
        const cat = this.state.category;
        cat.category_de = event.target.value;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    forThingHandler(event) {
        const cat = this.state.category;
        cat.forThing = event.target.checked;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    forSellHandler(event) {
        const cat = this.state.category;
        cat.forSell = event.target.checked;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    forEventHandler(event) {
        const cat = this.state.category;
        cat.forEvent = event.target.checked;
        this.setState({
            category: cat
        });

        this.refreshValidation();
    }
    translateSubmit(event) {
        console.log(event.target.innerText)
        let lang = event.target.innerText;
        let langFrom = this.state.category.lang ? this.state.category.lang : this.props.lang
        if (langFrom == 'zh_cn') {
            langFrom = 'zh';
        } else if (langFrom == 'us') {
            langFrom = 'en';
        }
        translate(this.state.category.category, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: langFrom, to: lang }).then(text => {
            console.log(text);  // Hola mundo
            if (lang == 'zh') {
                lang = 'zh_cn';
            } else if (lang == 'en') {
                lang = 'us';
            }
            const de = this.state.category;
            de["category_" + lang] = text;
            console.log(de);
            this.setState({
                category: de
            });

            this.refreshValidation();
        });
    }



    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        let parent = this.state.category.category_parent.length == 1 ? this.state.category.category_parent[0] : {
            forEvent: 1,
            forSell: 1,
            forThing: 1,
        }
        let children = this.state.category.category_children.length > 0 ? {
            forEvent: Math.max(...(this.state.category.category_children.map(item => { return item.forEvent }))),
            forSell: Math.max(...(this.state.category.category_children.map(item => { return item.forSell }))),
            forThing: Math.max(...(this.state.category.category_children.map(item => { return item.forThing })))
        } : {
                forEvent: 0,
                forSell: 0,
                forThing: 0,
            }


        console.log(children);
        //console.log(Math.max(...[100, 10, 1000]))
        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-60 g-mb-30 text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-10">
                    <h2 className="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('CATEGORY_EDIT_HEADER')}</h2>
                </Col>
                <Col className="text-center mx-auto g-max-width-600 g-mb-20">
                    {this.state.category.category_parent ? (this.state.category.category_parent[0] ? <label className="g-line-height-1_8 g-letter-spacing-1  g-mb-20 form-control-label">{tran.translate('CATEGORY_TYPE_LABEL') + ": " + this.state.category.category_parent[0].category}</label> : <span></span>) : <span></span>}
                </Col>
                <Row>
                    <Col>
                        <Checkbox disabled={parent.forThing == 0 || children.forThing == 1} onChange={this.forThingHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_FOR_THING_PLACEHOLDER')} value={this.state.category.forThing} label={tran.translate('CATEGORY_FOR_THING_LABEL')} field="forThing" validation={this.state.validation} />
                    </Col>
                    <Col>
                        <Checkbox disabled={parent.forSell == 0 || children.forSell == 1} onChange={this.forSellHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_FOR_SELL_PLACEHOLDER')} value={this.state.category.forSell} label={tran.translate('CATEGORY_FOR_SELL_LABEL')} field="forSell" validation={this.state.validation} />
                    </Col>  <Col>
                        <Checkbox disabled={parent.forEvent == 0 || children.forEvent == 1} onChange={this.forEventHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_FOR_EVENT_PLACEHOLDER')} value={this.state.category.forEvent} label={tran.translate('CATEGORY_FOR_EVENT_LABEL')} field="forEvent" validation={this.state.validation} />
                    </Col>
                </Row>
                <TextBox onChange={this.catHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_NAME_PLACEHOLDER')} isRequired={true} label={tran.translate('CATEGORY_NAME_LABEL')} value={this.state.category.category} field="category" validation={this.state.validation} />


                <Row>
                    <Col>
                        <TextBox onChange={this.plHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_PL_PLACEHOLDER')} value={this.state.category.category_pl} isRequired={true} label={tran.translate('CATEGORY_PL_LABEL')} field="category_pl" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="pl" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.usHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_US_PLACEHOLDER')} value={this.state.category.category_us} isRequired={true} label={tran.translate('CATEGORY_US_LABEL')} field="category_us" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="en" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.deHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_DE_PLACEHOLDER')} value={this.state.category.category_de} isRequired={true} label={tran.translate('CATEGORY_DE_ELABEL')} field="category_de" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="de" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.ruHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_RU_PLACEHOLDER')} value={this.state.category.category_ru} isRequired={true} label={tran.translate('CATEGORY_RU_LABEL')} field="category_ru" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="ru" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.frHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_FR_PLACEHOLDER')} value={this.state.category.category_fr} isRequired={true} label={tran.translate('CATEGORY_FR_LABEL')} field="category_fr" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="fr" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.esHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_ES_PLACEHOLDER')} value={this.state.category.category_es} isRequired={true} label={tran.translate('CATEGORY_ES_LABEL')} field="category_es" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="es" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.noHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_NO_PLACEHOLDER')} value={this.state.category.category_no} isRequired={true} label={tran.translate('CATEGORY_NO_LABEL')} field="category_no" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="no" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox onChange={this.zhcnHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_ZH_PLACEHOLDER')} value={this.state.category.category_zh_cn} isRequired={true} label={tran.translate('CATEGORY_ZH_LABEL')} field="category_zh_cn" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="zh" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"} isLoading={this.state.isLoading} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <IconTextbox onChange={this.iconHandler.bind(this)} placeholder={phTrans.translate('CATEGORY_ICON__PLACEHOLDER')} value={this.state.category.icon} label={tran.translate('CATEGORY_ICON__LABEL')} field="icon" validation={this.state.validation} />
                    </Col>
                </Row>

                <ButtonLoader onClick={this.submitHanlder.bind(this)} size={"md"} className={"btn u-btn-primary rounded-0"} value={"Submit"} isLoading={this.props.codeDict.edit.isLoading} />
            </Form>

        );
    }
}


const mapStateToProps = (state) => {
    //console.log(state);

    return {
        codeDict: state.DictionaryReducer,
        lang: state.LanguageReducer,
        categoryTree: state.CategoryTreeReaducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: (id) => {
            return dispatch(new BaseService().queryThunt(QueryList.Category.GET_CATEGORIES_HIERARCHY, { id: id }));
        }, getDictionary: () => {
            dispatch({
                type: QueryList.Dictionary.GET_DICTIONARY,
            })
        },
        addCategories: (dto) => {
            return dispatch(new BaseService().commandThunt(CommandList.Category.ADD_CATEGORY, dto));

        }
        , setNotification: (type, message) => {
            dispatch({ type: CATEGORY_TREE_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: { message: message, type: type } });

        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(AddCategory));