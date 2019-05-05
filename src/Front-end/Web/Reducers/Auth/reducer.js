import { combineReducers } from 'redux';
import AUTH_ACTIONS from './action';



let emptyState = {

    token: null,
    refresh_token: null,
    expired_date: null,
    is_logged: false,
    user: null


}
export default function AuthReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case AUTH_ACTIONS.IS_AUTH:
            {
                const result = Object.assign({}, state);
                result.token = action.dto.token;
                result.refresh_token = action.dto.refresh_token;
                if (result.token) {
                    result.is_logged = true;
                }
                return result;
            }

        case AUTH_ACTIONS.GET_USER_INFO_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                result.user = action.data;
                result.is_logged = true;
                return result;
            }
        case AUTH_ACTIONS.GET_USER_INFO_FETCH.ERROR:
            {
                const result = Object.assign({}, state);
                result.token = null;
                result.token = null;
                result.is_logged = false;
                result.user = null;
                return result;
            }
        case AUTH_ACTIONS.LOG_OUT_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                result.token = null;
                result.token = null;
                result.is_logged = false;
                result.user = null;
                return result;
            }
        default:
            {
                return state;
            }
    }

}