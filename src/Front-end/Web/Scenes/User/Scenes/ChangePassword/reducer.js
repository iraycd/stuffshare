import { combineReducers } from 'redux';
import CHANGE_PASSWORD_ACTIONS from './actions';

let emptyState = {
   
  
    exception:undefined,
    isLoading: false
   
}
export default function ChangePasswordReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        
     
    case CHANGE_PASSWORD_ACTIONS.CHANGE_PASSWORD_FETCH.LOADING:
        {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
    case CHANGE_PASSWORD_ACTIONS.CHANGE_PASSWORD_FETCH.FINALLY:
        {
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