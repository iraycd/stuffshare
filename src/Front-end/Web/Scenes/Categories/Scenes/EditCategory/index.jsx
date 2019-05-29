/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { DictionaryDTO, Enums, CommandList, QueryList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import { withRouter } from 'react-router-dom';
import translate from 'translate';


class CategoryEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = new DictionaryDTO();

        this.state.validation = [];


    }
    componentWillReceiveProps(next) {
        console.log(next);
        const urlParams = new URLSearchParams(next.location.search);

        const type = urlParams.get('type');
        const code = urlParams.get('code');
        console.log(this.props.codeDict.data);
        let dictList = this.props.codeDict.data[type];
        console.log(dictList);
        if (dictList != undefined) {
            console.log('kupa');
            let codeItem = dictList[code];
            this.setState({
                message: codeItem.message,
                code: codeItem.code,
                status: codeItem.statu,
                type: codeItem.type,
                validation: []
            })
        }
        console.log(code);

    }
    refreshValidation() {
        if (this.state.toRefresh) {
            setTimeout(() => {
                //          this.validation();
            });
        }
    }
    getDropDownValues() {
        return [
            { id: Enums.CODE.ERROR, value: Enums.CODE.ERROR }
            , { id: Enums.CODE.INFO, value: Enums.CODE.INFO }
            , { id: Enums.CODE.VALIDATION, value: Enums.CODE.VALIDATION }
            , { id: Enums.CODE.WARNING, value: Enums.CODE.WARNING }
            , { id: Enums.CODE.SUCCESS, value: Enums.CODE.SUCCESS }
            , { id: Enums.CODE.ERROR_GLOBAL, value: Enums.CODE.ERROR_GLOBAL }
            , { id: Enums.CODE.INFO_GLOBAL, value: Enums.CODE.INFO_GLOBAL }
            , { id: Enums.CODE.SUCCESS_GLOBAL, value: Enums.CODE.SUCCESS_GLOBAL }
            , { id: Enums.CODE.WARNING_GLOBAL, value: Enums.CODE.WARNING_GLOBAL }
            , { id: Enums.CODE.LABEL, value: Enums.CODE.LABEL }
            , { id: Enums.CODE.PLACEHOLDER, value: Enums.CODE.PLACEHOLDER }
            , { id: Enums.CODE.EMAIL, value: Enums.CODE.EMAIL }


        ]
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
    codeHandler(event) {
        this.setState({
            code: event.target.value
        });

        this.refreshValidation();


    }
    statusHandler(event) {
        this.setState({
            status: event.target.value
        });
        this.refreshValidation();
    }

    plHandler(event) {
        const pl = this.state.message;
        pl.pl = event.target.value;
        this.setState({
            message: pl
        });

        this.refreshValidation();
    }
    usHandler(event) {
        const us = this.state.message;
        us.us = event.target.value;
        this.setState({
            message: us
        });

        this.refreshValidation();
    }

    deHandler(event) {
        const de = this.state.message;
        de.de = event.target.value;
        this.setState({
            message: de
        });

        this.refreshValidation();
    }
    frHandler(event) {
        const fr = this.state.message;
        fr.fr = event.target.value;
        this.setState({
            message: fr
        });

        this.refreshValidation();
    }
    ruHandler(event) {
        const ru = this.state.message;
        ru.ru = event.target.value;
        this.setState({
            message: ru
        });

        this.refreshValidation();
    }
    noHandler(event) {
        const no = this.state.message;
        no.no = event.target.value;
        this.setState({
            message: no
        });

        this.refreshValidation();
    }
    esHandler(event) {
        const es = this.state.message;
        es.es = event.target.value;
        this.setState({
            message: es
        });

        this.refreshValidation();
    }
    zhHandler(event) {
        const zh = this.state.message;
        zh.zh = event.target.value;
        this.setState({
            message: zh
        });

        this.refreshValidation();
    }
    typeHandler(event) {
        this.setState({
            type: event.target.value
        });

        this.refreshValidation();
    }
    submitHanlder(event) {
        this.state.toRefresh = true;


        event.preventDefault();
        //   if (this.validation().length == 0) {
        // this.props.code=this.state;

        this.props.addDictionary(this.state);

        //   }
    }
    translateSubmit(event) {
        console.log(event.target.innerText)
        let lang = event.target.innerText;
        translate(this.state.message.pl, { engine: 'yandex', key: 'trnsl.1.1.20190525T222610Z.47a7d82b340b189e.59764ef074ae84f21bed0836d101d4743a754577', from: 'pl', to: lang}).then(text => {
            console.log(text);  // Hola mundo
            if(lang=='zh')
            {
                lang='zh_cn';
            }else if(lang=='en'){
                lang='us';
            }
            const de = this.state.message;
            de[lang] = text
            this.setState({
                message: de
            });

            this.refreshValidation();
        });
    }

    render() {
        const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
        const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
        return (

            <Form className="g-brd-around g-brd-gray-light-v4 g-pa-60 g-mb-30 text-center">
                <Col className="text-center mx-auto g-max-width-600 g-mb-50">
                    <h2 className="g-color-black mb-4">{tran.translate('CODE_FORM_HEADER')}</h2>
                    <p className="lead "></p>
                </Col>

                <TextBox placeholder={phTrans.translate('CODE_CODE_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_CODE_LABEL')} value={this.state.code} onChange={this.codeHandler.bind(this)} field="code" validation={this.state.validation} />

                <DropDownList isRequired={true} label={tran.translate('CODE_TYPE_LABEL')} valueOptions={this.getDropDownValues()} value={this.state.type} onChange={this.typeHandler.bind(this)} field="type" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('CODE_STATUS_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_STATUS_LABEL')} value={this.state.status} onChange={this.statusHandler.bind(this)} field="status" validation={this.state.validation} />

                <TextBox placeholder={phTrans.translate('CODE_PL_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_PL_LABEL')} value={this.state.message.pl} onChange={this.plHandler.bind(this)} field="message.pl" validation={this.state.validation} />

                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_US_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_US_LABEL')} value={this.state.message.us} onChange={this.usHandler.bind(this)} field="message.us" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="en" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"}  isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_DE_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_DE_LABEL')} value={this.state.message.de} onChange={this.deHandler.bind(this)} field="message.de" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="de" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn rounded-0"}  isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_RU_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_RU_LABEL')} value={this.state.message.ru} onChange={this.ruHandler.bind(this)} field="message.ru" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="ru" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btnrounded-0"}  isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_FR_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_FR_LABEL')} value={this.state.message.fr} onChange={this.frHandler.bind(this)} field="message.fr" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="fr" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"}  isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_ES_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_ES_LABEL')} value={this.state.message.es} onChange={this.esHandler.bind(this)} field="message.es" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="es" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btn  rounded-0"}  isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_NO_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_NO_LABEL')} value={this.state.message.no} onChange={this.noHandler.bind(this)} field="message.no" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="no" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btnrounded-0"}  isLoading={this.state.isLoading} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <TextBox placeholder={phTrans.translate('CODE_ZH_CN_PLACEHOLDER')} isRequired={true} label={tran.translate('CODE_ZH_CN_LABEL')} value={this.state.message.zh_cn} onChange={this.zhHandler.bind(this)} field="message.zh_cn" validation={this.state.validation} />
                    </Col>
                    <Col xs="3"><ButtonLoader value="zh" onClick={this.translateSubmit.bind(this)} size={"md"} className={"btnrounded-0"} isLoading={this.state.isLoading} />
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
        lang: state.LanguageReducer

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDictionary: (dto) => {
            dispatch(new BaseService().commandThunt(CommandList.Dictionary.ADD_DICTIONARY, dto));
        }, getDictionary: () => {
            dispatch({
                type: QueryList.Dictionary.GET_DICTIONARY,
            })
        }
    }
}

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryEdit));