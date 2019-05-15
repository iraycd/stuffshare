import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import CommandList from "../../../../../../Shared/CommandList";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";



const REMOVE_USER_ACTIONS = {
 
    REMOVE_USER_FETCH :ActionsGen(CommandList.User.REMOVE_USER),
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL

}




export default  REMOVE_USER_ACTIONS
