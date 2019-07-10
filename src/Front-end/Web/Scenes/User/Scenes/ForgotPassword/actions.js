import CommandList from "../../../../../../Shared/CommandList";
import ActionsGen from "../../../../../App/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";
import { LANGUAGE_ACTIONS } from "../../../../Reducers/Language/actions";


const FORGOT_PASSWORD_ACTIONS = {
  
    
    FORGOT_PASSWORD_CHCEK_FETCH :ActionsGen(CommandList.User.FORGOT_PASSWORD_CHECK),

    SET_LANGUAGE:LANGUAGE_ACTIONS.SET_LANGUAGE,
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL
}




export default  FORGOT_PASSWORD_ACTIONS
