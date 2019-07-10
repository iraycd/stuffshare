import SIGN_IN_MODAL_ACTIONS from './actions';

let emptyState = {
    
        open: false,
        action: "login"
    
}
export default function UserModalReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {
        
        case SIGN_IN_MODAL_ACTIONS.OPEN_MODAL: {

            const result = Object.assign({}, state);
            result.action = action.dto.action
            return result;
        } case SIGN_IN_MODAL_ACTIONS.CLOSE_WINDOW: {

            const result = Object.assign({}, state);
            result.action = emptyState.action
            return result;
        }
        

        default:
            {
                return state;
            }
    }

}