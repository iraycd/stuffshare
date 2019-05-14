/*
    ./client/components/App.jsx
*/

import React from 'react';
import { connect } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Container, Row } from 'reactstrap';
import { Enums, CommandList, Translator } from './../../../../../../Shared/index.js';
import { BaseService } from './../../../../../App/index.js';
import { TextBox, DropDownList, ButtonLoader } from './../../../../Components/index.js';
import QueryList from '../../../../../../Shared/QueryList.js';
import { Link, NavLink, BrowserRouter, Route, Switch } from 'react-router-dom';

class SearchFreetext extends React.Component {

  constructor() {
    super();
    this.state = { cat_id: "", cat: "" };
    this.state.validation = [];
  }
  refreshValidation() {
    if (this.state.toRefresh) {
      setTimeout(() => {
        this.validation();
      });
    }
  }


  render() {
    const tran = Translator(this.props.codeDict.data.LABEL, this.props.lang);
    const phTrans = Translator(this.props.codeDict.data.PLACEHOLDER, this.props.lang);
    this.refreshValidation();


    return (
      <div class="container  g-flex-centered  g-z-index-1 g-py-40">
        <div class="row  g-flex-centered align-self-center">
          <div class=" g-width-780 align-self-center g-pa-5">
            <div class="g-bg-white-opacity-0_9 g-rounded-0   g-pa-10 g-pa-10--md  ">
              <div class="g-brd-around g-brd-gray-light-v1  g-pa-50 g-pa-30--md text-center">
                <h3 class="h6 text-uppercase g-letter-spacing-2 g-font-weight-600 text-uppercase text-center  g-color-gray-dark-v4 g-mb-5">{tran.translate('SEARCH_HOMEPAGE_HEADER')}</h3>
                <p class="g-line-height-1_8 g-letter-spacing-1  g-mb-20">{tran.translate('SEARCH_HOMEPAGE_TEXT')}
                </p>
                <form >
                  <div class=" g-pa-10 form-group g-ma-20 g-mb-20--md">
                    <input class="form-control h-100 g-pa-15  form-control rounded-0 form-control" type="text" placeholder={phTrans.translate('SEARCH_HOMEPAGE_INPUT_PLACEHOLDER')} />
                  </div>
                  <Link to={`/search?catId=${this.state.cat_id}&q=${this.state.cat}`} class="g-letter-spacing-1 btn btn-md  text-uppercase u-btn-primary g-font-weight-700 g-font-size-12 g-brd-none rounded-0 g-py-12 g-px-15" >{tran.translate('SEARCH_BUTTON_LABEL')}</Link>
                </form>
              </div>
            </div>
          </div>


        </div>
      </div>


    );
  }
}


const mapStateToProps = (state) => {
  //console.log(state);

  return {
    codeDict: state.DictionaryReducer,
    lang: state.LanguageReducer,

  };
}

const mapDispatchToProps = (dispatch) => {


}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchFreetext);