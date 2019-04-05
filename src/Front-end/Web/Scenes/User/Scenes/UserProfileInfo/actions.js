import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
MODAL_ACTIONS


const LOGIN_ACTIONS = {
  
    
    LOG_IN_INTERNAL_FETCH :ActionsGen(QueryList.User.LOG_IN_INTERNAL),
    GEN_REFRESH_TOKEN_FETCH :ActionsGen(CommandList.User.GEN_REFRESH_TOKEN),
    GET_REFRESH_TOKEN_FETCH :ActionsGen(QueryList.User.GET_REFRESH_TOKEN),
    CLOSE_WINDOW: MODAL_ACTIONS.CLOSE_MODAL,
    IS_AUTH:AUTH_ACTIONS.IS_AUTH
}




export default  LOGIN_ACTIONS
