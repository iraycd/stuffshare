"use strict";
const axios = require('axios');
import ClientException from './Exceptions/clientExceptions.js';
import { LOADER_ACTIONS } from './../Reducers/Loader/actions.js';

import { NOTIFICATIONS_ACTIONS } from './../Reducers/Notifications/actions.js';
import { Enums } from './../../../Shared/index.js';
import WEB_CONFIG from '../../config.js';

class BaseService {

    queryThunt(action, model = {}, token = null, loader = null) {

        return (dispatch) => {
            switch (loader) {
                case Enums.LOADER.INITIAL: dispatch({ type: LOADER_ACTIONS.SET_INITIAL_ACTION, actionName: action });
                case Enums.LOADER.BODY: dispatch({ type: LOADER_ACTIONS.SET_BODY_ACTION, actionName: action });
                case Enums.LOADER.CONTAINER: dispatch({ type: LOADER_ACTIONS.SET_CONTAINER_ACTION, actionName: action });
                default: ;
            }
            dispatch({ type: action + "_LOADING" });
            return axios({
                method: 'get',
                url: WEB_CONFIG.API_URL[process.env.NODE_ENV] + '/query?action=' + JSON.stringify({ "action": action, "model": model }),
                headers: { "Authorization": `Bearer ${token}` }
            })
                .then(response => {

                    dispatch({ type: action + "_SUCCESS", data: response.data, dto: model });

                })
                .catch(function (error) {
                    BaseService.prototype.errorHandling(error, dispatch, action, model);
                }).then(function () {

                    dispatch({ type: action + "_FINALLY" });

                    switch (loader) {
                        case Enums.LOADER.INITIAL: dispatch({ type: LOADER_ACTIONS.FINISH_INITIAL_ACTION, actionName: action });
                        case Enums.LOADER.BODY: dispatch({ type: LOADER_ACTIONS.FINISH_BODY_ACTION, actionName: action });
                        case Enums.LOADER.CONTAINER: dispatch({ type: LOADER_ACTIONS.FINISH_CONTAINER_ACTION, actionName: action });
                        default: ;
                    }
                });
        }
    }
    commandThunt(action, model = {}, token = null, loader = null) {

        return (dispatch) => {
            switch (loader) {
                case Enums.LOADER.INITIAL: dispatch({ type: LOADER_ACTIONS.SET_INITIAL_ACTION, actionName: action });
                case Enums.LOADER.BODY: dispatch({ type: LOADER_ACTIONS.SET_BODY_ACTION, actionName: action });
                case Enums.LOADER.CONTAINER: dispatch({ type: LOADER_ACTIONS.SET_CONTAINER_ACTION, actionName: action });
                default: ;
            }
            dispatch({ type: action + "_LOADING" });
            return axios({
                method: 'POST',
                url: WEB_CONFIG.API_URL[process.env.NODE_ENV] + '/command',
                data: { "action": action, "model": model },
                headers: { "Authorization": `Bearer ${token}` }

            })
                .then(response => {
                    dispatch({
                        type: action + "_SUCCESS",
                        data: response.data,
                        dto: model
                    });
                })
                .catch(function (error) {
                    BaseService.prototype.errorHandling(error, dispatch, action, model);

                }).then(function () {
                    dispatch({ type: action + "_FINALLY" });

                    switch (loader) {
                        case Enums.LOADER.INITIAL: dispatch({ type: LOADER_ACTIONS.FINISH_INITIAL_ACTION, actionName: action });
                        case Enums.LOADER.BODY: dispatch({ type: LOADER_ACTIONS.FINISH_BODY_ACTION, actionName: action });
                        case Enums.LOADER.CONTAINER: dispatch({ type: LOADER_ACTIONS.FINISH_CONTAINER_ACTION, actionName: action });
                        default: ;
                    }
                });
        }
    }


    errorHandling(error, dispatch, action, model) {
        if (error.response) {
            if (error.response.data.error.type.indexOf('_GLOBAL') > 0) {

                const exception = error.response.data.error;
                dispatch({ type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: exception });
            } else if (error.response.data.error.type.indexOf('ERROR') == 0) {
                console.log(error.response.data.error)
                dispatch({ type: action + "_ERROR", exception: error.response.data.error });
            }
        } else {
            const exception = new ClientException();
            exception.error.type = Enums.CODE.ERROR_GLOBAL;
            exception.error.message.pl = error.message;
            exception.error.message.us = error.message;
            dispatch({ type: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL, notification: exception.error });



            console.log('Error', error);
        }
    }

};

module.exports = { BaseService };