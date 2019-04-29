import ActionsGen from "../../../../../App/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import USER_ACCOUNTS_ACTION from "../../Components/UserAccount/actions";
import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";



const ADD_PROFILE_IMAGE_ACTIONS = {


    OPEN_WINDOW: MODAL_ACTIONS.OPEN_MODAL,
    CLOSE_WINDOW: MODAL_ACTIONS.CLOSE_MODAL,

    GET_USER_IMAGES: ActionsGen(QueryList.Blob.GET_USER_IMAGES),
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    UPLOAD_IMAGE: ActionsGen(CommandList.Blob.UPLOAD_IMAGE),
    OPEN_LIGHTBOX:LIGHTBOX_ACTIONS.OPEN_LIGHTBOX

}




export default ADD_PROFILE_IMAGE_ACTIONS
