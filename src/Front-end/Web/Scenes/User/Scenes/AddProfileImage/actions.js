import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import LIGHTBOX_ACTIONS from "../../../../Components/ImageLightbox/actions";
import MODAL_ACTIONS from "../../../../Components/ModalComponent/actions";
import AUTH_ACTIONS from "../../../../Reducers/Auth/action";



const ADD_PROFILE_IMAGE_ACTIONS = {


    OPEN_WINDOW: MODAL_ACTIONS.OPEN_MODAL,
    CLOSE_WINDOW: MODAL_ACTIONS.CLOSE_MODAL,

    GET_USER_IMAGES: ActionsGen(QueryList.Blob.GET_USER_IMAGES),
    REMOVE_IMAGE: ActionsGen(CommandList.Blob.REMOVE_BLOB),
    UPLOAD_IMAGE: ActionsGen(CommandList.Blob.UPLOAD_IMAGE),
    OPEN_LIGHTBOX:LIGHTBOX_ACTIONS.OPEN_LIGHTBOX,
    IS_AUTH:AUTH_ACTIONS.IS_AUTH,
    ADD_PROFILE_IMAGE_LOADING:'ADD_PROFILE_IMAGE_LOADING'

}




export default ADD_PROFILE_IMAGE_ACTIONS
