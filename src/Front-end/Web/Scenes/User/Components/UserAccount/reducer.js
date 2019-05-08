import { combineReducers } from 'redux';
import USER_ACCOUNTS_ACTION from './actions';

let emptyState = {

    images:[],

    getImagesIsLoading: false

}
export default function UserAccountReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        case USER_ACCOUNTS_ACTION.GET_USER_IMAGES.SUCCESS: {

            const result = Object.assign({}, state);
            console.log(action);
            result.images = action.data;
            return result;
        } case USER_ACCOUNTS_ACTION.GET_USER_IMAGES.LOADING: {

            const result = Object.assign({}, state);
            result.getImagesIsLoading = true
            return result;
        }
        case USER_ACCOUNTS_ACTION.GET_USER_IMAGES.FINALLY: {

            const result = Object.assign({}, state);
            result.getImagesIsLoading = false
            return result;
        }
        case USER_ACCOUNTS_ACTION.REMOVE_IMAGE.LOADING:
        {
            const result = Object.assign({}, state);
            console.log('kupa');
            result.images = state.images.map(item => {
                if(item.id == action.dto.id)
                {
                    item.isLoading=true
                }
                return item
            })
            return result;
        }
        

        case USER_ACCOUNTS_ACTION.REMOVE_IMAGE.SUCCESS:
            {
                const result = Object.assign({}, state);
                result.images = state.images.filter(item => {
                    return item.id != action.dto.id
                })
                return result;
            }


        default:
            {
                return state;
            }
    }

}