import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";


const VERIFY_IMAGE_ACTION = {
    OPEN_LIGHTBOX:LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    GET_UNVERIFIED: ActionsGen(QueryList.Blob.GET_UNVERIFIED),
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    VERIFY_IMAGE : ActionsGen(CommandList.Blob.VERIFY_IMAGE)
  
}

export default  VERIFY_IMAGE_ACTION
