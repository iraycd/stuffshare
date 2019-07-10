import CommandList from "../../../../../../Shared/CommandList";
import ActionsGen from "../../../../../App/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";


const REGISTER_USER_ACTIONS = {
  
    
    CREATE_USER_FETCH :ActionsGen(CommandList.User.CREATE_USER),
    CLOSE_WINDOW: MODAL_ACTIONS.CLOSE_MODAL,
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL
   
}




export default  REGISTER_USER_ACTIONS
