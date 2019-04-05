/* 
    ./client/index.js
*/

import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
window.jQuery = $;
import './assets/vendor/bootstrap/bootstrap.js';
import './assets/js/custom.js';
import './assets/js/hs.core.js';

import './../../Shared/BaseObjects/Helper/commonFunctions.js';

import App from './Scenes/index.jsx';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import configureStore from './store.js';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { BaseService, LANGUAGE_ACTIONS } from './../App/index.js';
import { QueryList, Enums } from './../../Shared/index.js';

import logo from './assets/img/logo/logo-1.png';
import AUTH_ACTIONS from './Reducers/Auth/action.js';
let store = configureStore({});
//INIT
let loader = 0;
const init = () => {

    const language = localStorage.getItem('lang');
    if (language != null) {
        store.dispatch({
            type: LANGUAGE_ACTIONS.SET_LANGUAGE,
            lang: language
        });
    }

    store.dispatch(new BaseService().queryThunt(QueryList.Dictionary.GET_DICTIONARY, {},localStorage.token, Enums.LOADER.INITIAL));

    if( localStorage.token){
        store.dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO,{},localStorage.token, Enums.LOADER.INITIAL)).then(succ=>{
           
            store.dispatch({
                type: AUTH_ACTIONS.IS_AUTH,
                dto: {
                    refresh_token: localStorage.refresh_token,
                    token: localStorage.token
                }
            });
        })
    }
}

init();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Route path={"/"} component={App} >
            </Route>
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));
