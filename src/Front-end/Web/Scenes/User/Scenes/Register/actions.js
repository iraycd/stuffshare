import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import AUTH_ACTIONS from "../../../../Reducers/Auth/action";
import { LANGUAGE_ACTIONS } from "../../../../Reducers/Language/actions";


const REGISTER_USER_ACTIONS = {
  
    
    CREATE_USER_FETCH :ActionsGen(CommandList.User.CREATE_USER),
    CLOSE_WINDOW: MODAL_ACTIONS.CLOSE_MODAL,
   
}




export default  REGISTER_USER_ACTIONS
