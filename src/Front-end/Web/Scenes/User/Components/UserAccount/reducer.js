import { combineReducers } from 'redux';
import USER_ACCOUNTS_ACTION from './actions';

let emptyState = {

    images:[],

    getImagesIsLoading: false

}
export default function UserAccountReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        


        default:
            {
                return state;
            }
    }

}