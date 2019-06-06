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
import { Enums } from './../../Shared/index.js';

import logo from './assets/img/logo/logo-1.png';
import AUTH_ACTIONS from './Reducers/Auth/action.js';
import QueryList from '../../Shared/QueryList.js';
import { LOADER_ACTIONS } from '../App/Reducers/Loader/actions.js';

let store = configureStore({});
//INIT
let loader = 0;
const init = () => {
    let logged = false;
    store.dispatch({
        type: LOADER_ACTIONS.SET_INITIAL_ACTION,
        dto: {

        }
    });
    if (!localStorage.lang) {
        localStorage.lang = 'us';
    }
    if (localStorage.token) {
        logged = true;
        let userLogIn = {};
        store.dispatch(new BaseService().queryThunt(QueryList.User.LOG_IN_BY_REFRESH_TOKEN, { refresh_token: localStorage.refresh_token }, {}, Enums.LOADER.INITIAL))
            .then(refSucc => {
                console.log(refSucc);
                localStorage.refresh_token = refSucc.data.refresh_token
                localStorage.token = refSucc.data.token;
                return store.dispatch(new BaseService().queryThunt(QueryList.User.USER_INFO, {}, localStorage.token, Enums.LOADER.INITIAL));
            }).then(succ => {

                console.log(succ.data);
                store.dispatch({
                    type: AUTH_ACTIONS.IS_AUTH,
                    dto: {
                        refresh_token: localStorage.refresh_token,
                        token: localStorage.token,
                        user: succ.data
                    }
                });
                store.dispatch({
                    type: LOADER_ACTIONS.FINISH_INITIAL_ACTION,
                    dto: {

                    }
                });

            }).catch(ex => {
                store.dispatch({
                    type: AUTH_ACTIONS.CLEAR_CONTEXT,
                    dto: {}
                });
                localStorage.removeItem("token");
                localStorage.removeItem("refresh_token");
                init();
            })

    }
    const language = localStorage.getItem('lang');
    if (language != null) {
        store.dispatch({
            type: LANGUAGE_ACTIONS.SET_LANGUAGE,
            lang: language
        });
    }

    setInterval(() => {
     //   init();
        window.location.reload();
    }, 7200000)

    store.dispatch(new BaseService().queryThunt(QueryList.Dictionary.GET_DICTIONARY, {})).then(succ => {
        if (logged == false) {
            store.dispatch({
                type: LOADER_ACTIONS.FINISH_INITIAL_ACTION,
                dto: {

                }
            });
        }
    });


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
