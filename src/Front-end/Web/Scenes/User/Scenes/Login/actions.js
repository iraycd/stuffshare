import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import AUTH_ACTIONS from "../../../../Reducers/Auth/action";
import { LANGUAGE_ACTIONS } from "../../../../Reducers/Language/actions";


const LOGIN_ACTIONS = {
  
    
    LOG_IN_INTERNAL_FETCH :ActionsGen(QueryList.User.LOG_IN_INTERNAL),
    GEN_REFRESH_TOKEN_FETCH :ActionsGen(CommandList.User.GEN_REFRESH_TOKEN),
    GET_REFRESH_TOKEN_FETCH :ActionsGen(QueryList.User.GET_REFRESH_TOKEN),
    CLOSE_WINDOW: MODAL_ACTIONS.CLOSE_MODAL,
    IS_AUTH:AUTH_ACTIONS.IS_AUTH,
    SET_LANGUAGE:LANGUAGE_ACTIONS.SET_LANGUAGE
}




export default  LOGIN_ACTIONS
