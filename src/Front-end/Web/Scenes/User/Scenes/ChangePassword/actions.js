import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import AUTH_ACTIONS from "../../../../Reducers/Auth/action";
import { LANGUAGE_ACTIONS } from "../../../../Reducers/Language/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";


const CHANGE_PASSWORD_ACTIONS = {
  
    
    CHANGE_PASSWORD_FETCH :ActionsGen(CommandList.User.CHANGE_PASSWORD),

    
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL
}




export default  CHANGE_PASSWORD_ACTIONS
