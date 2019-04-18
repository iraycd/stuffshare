import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import AUTH_ACTIONS from "../../../../Reducers/Auth/action";
import { LANGUAGE_ACTIONS } from "../../../../Reducers/Language/actions";


const FORGOT_PASSWORD_ACTIONS = {
  
    
    FORGOT_PASSWORD_CHCEK_FETCH :ActionsGen(CommandList.User.FORGOT_PASSWORD_CHECK),

    SET_LANGUAGE:LANGUAGE_ACTIONS.SET_LANGUAGE
}




export default  FORGOT_PASSWORD_ACTIONS