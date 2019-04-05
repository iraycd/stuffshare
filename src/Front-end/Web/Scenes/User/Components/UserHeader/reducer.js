import { combineReducers } from 'redux';

import {
    USER_HEADER_ACTIONS
} from './actions';

export default function UserHeaderReducer(state = 'us', action) {
    switch (action.type) {

        case USER_HEADER_ACTIONS.SET_LANGUAGE:
            {
                return action.lang;
            }

        default:
            {
                return state;
            }
    }

}