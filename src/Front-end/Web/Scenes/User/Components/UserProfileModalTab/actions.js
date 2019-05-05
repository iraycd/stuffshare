import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";


const USER_PROFILE_MODAL_ACTION = {
    OPEN_LIGHTBOX:LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    CLOSE_MODAL:MODAL_ACTIONS.CLOSE_MODAL,
    GET_USER_IMAGES: ActionsGen(QueryList.Blob.GET_USER_IMAGES),
}

export default  USER_PROFILE_MODAL_ACTION
