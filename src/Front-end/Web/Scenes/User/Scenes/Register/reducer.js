import REGISTER_USER_ACTIONS from './actions';

let emptyState = {
   
    
    exception:undefined,
    isLoading: false
   
}
export default function RegisterReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        
        case REGISTER_USER_ACTIONS.CREATE_USER_FETCH.SUCCESS:
        {

            const result = Object.assign({}, state);
            result.exception = undefined;
            return result;
        }
    case REGISTER_USER_ACTIONS.CREATE_USER_FETCH.LOADING:
        {
            const result = Object.assign({}, state);
            result.isLoading = true;
            return result;
        }
    case REGISTER_USER_ACTIONS.CREATE_USER_FETCH.FINALLY:
        {
            const result = Object.assign({}, state);
            result.isLoading = false;
            return result;
        }
 
        /*case LOGIN_ACTIONS.GET_REFRESH_TOKEN_FETCH.SUCCESS: {

            const result = Object.assign({}, state);
            result.isLoading = false;

            return result;
        }*/

        default:
            {
                return state;
            }
    }

}