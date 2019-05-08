import { combineReducers } from 'redux';
import ADD_PROFILE_IMAGE_ACTIONS from './actions';

let emptyState = {

    images: [],

    getImagesIsLoading: false

}
export default function AddProfileImageReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        

        case ADD_PROFILE_IMAGE_ACTIONS.UPLOAD_IMAGE.FINALLY:
            {
                const result = Object.assign({}, state);
                result.getImagesIsLoading = false;
                return result;
            }
            case ADD_PROFILE_IMAGE_ACTIONS.UPLOAD_IMAGE.LOADING:
            {
                const result = Object.assign({}, state);
                result.getImagesIsLoading = true;
                return result;
            }
        default:
            {
                return state;
            }
    }

}