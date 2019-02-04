import { combineReducers } from 'redux';

import {
    USER_ACTIONS
} from './actions';

let emptyState = {
    modal: {
        open: false,
        action: "login"
    },
    user_info: {

    },
    isLogged: false,
    login: {
        isLoading: false,
        auth: {},

    }
}
export default function UserReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case USER_ACTIONS.LOG_IN_INTERNAL_FETCH.SUCCESS:
            {

                const result = Object.assign({}, state);
                result.login.auth = Object.assign({}, action.data);
                result.login.auth.uid = '';
                result.login.exception = undefined;
                result.isLogged = true;
                console.log(result);
                return result;
            }
        case USER_ACTIONS.LOG_IN_INTERNAL_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.login.isLoading = true;
                return result;
            }
        case USER_ACTIONS.LOG_IN_INTERNAL_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.login.isLoading = false;
                return result;
            }
        case USER_ACTIONS.LOG_IN_INTERNAL_FETCH.ERROR:
            {
                console.log(action);
                const result = Object.assign({}, state);
                result.login.exception = Object.assign({}, action.exception);
                result.login.isLoading = false;
                return result;
            }
        case USER_ACTIONS.OPEN_WINDOW: {

            const result = Object.assign({}, state);
            result.modal.open = action.dto.open;
            result.modal.action = action.dto.action
            return result;
        } case USER_ACTIONS.CLOSE_MODAL: {

            const result = Object.assign({}, state);
            result.login = Object.assign({}, emptyState.login);
            result.modal.open = false;
            return result;
        }
        case USER_ACTIONS.USER_INFO_FETCH.SUCCESS: {

            const result = Object.assign({}, state);
            result.user_info = action.data;
            result.isLogged = true;
            return result;
        }
        default:
            {
                return state;
            }
    }

}