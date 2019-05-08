import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";


const USER_ACCOUNTS_ACTION = {
    OPEN_LIGHTBOX:LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    GET_USER_IMAGES: ActionsGen(QueryList.Blob.GET_USER_IMAGES),
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
}

export default  USER_ACCOUNTS_ACTION
