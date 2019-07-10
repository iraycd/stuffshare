import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import { LANGUAGE_ACTIONS } from "../../../../Reducers/Language/actions";


/*
 * action types
 */

 
export const USER_HEADER_ACTIONS = {
    SET_LANGUAGE: LANGUAGE_ACTIONS.SET_LANGUAGE,
    OPEN_MODAL:MODAL_ACTIONS.OPEN_MODAL,
    CLOSE_MODAL:MODAL_ACTIONS.CLOSE_MODAL
}