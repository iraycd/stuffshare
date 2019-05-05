import { combineReducers } from 'redux';
import USER_PROFILE_MODAL_ACTION from './actions';

let emptyState = {

    images: [],

    getImagesIsLoading: false

}
export default function UserProfileModalTabReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case USER_PROFILE_MODAL_ACTION.GET_USER_IMAGES.SUCCESS: {

            const result = Object.assign({}, state);
            console.log(action);
            result.images = action.data;
            return result;
        } case USER_PROFILE_MODAL_ACTION.GET_USER_IMAGES.LOADING: {

            const result = Object.assign({}, state);
            result.getImagesIsLoading = true
            return result;
        }
        case USER_PROFILE_MODAL_ACTION.GET_USER_IMAGES.FINALLY: {

            const result = Object.assign({}, state);
            result.getImagesIsLoading = false
            return result;
        }
      
        default:
            {
                return state;
            }
    }

}