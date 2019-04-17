import { combineReducers } from 'redux';
import LOGIN_ACTIONS from './actions';
import FORGOT_PASSWORD_ACTIONS from './actions';

FORGOT_PASSWORD_ACTIONS
let emptyState = {
   
 
   isLoading:false
}
export default function ForgotPasswordReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        
        case FORGOT_PASSWORD_ACTIONS.FORGOT_PASSWORD_CHCEK_FETCH.LOADING: {

            const result = Object.assign({}, state);
            result.isLoading = true;

            return result;
        }
  
        case FORGOT_PASSWORD_ACTIONS.FORGOT_PASSWORD_CHCEK_FETCH.FINALLY: {

            const result = Object.assign({}, state);
            result.isLoading = false;

            return result;
        }

        default:
            {
                return state;
            }
    }

}