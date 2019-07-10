import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";


const USER_PROFILE_MODAL_ACTION = {
    OPEN_LIGHTBOX: LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    CLOSE_MODAL: MODAL_ACTIONS.CLOSE_MODAL,
    GET_USER_IMAGES: ActionsGen(QueryList.Blob.GET_USER_IMAGES),
    SET_NOTIFICATION_GLOBAL: NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL

}

export default USER_PROFILE_MODAL_ACTION
