import QueryList from "../../../../Shared/QueryList";
import ActionsGen from "../../../App/actions";



const LIGHTBOX_ACTIONS = {
  
    OPEN_LIGHTBOX: 'OPEN_LIGHTBOX',
    CLOSE_LIGHTBOX:'CLOSE_LIGHTBOX',
    GET_BLOBS_BY_GUIDS_FETCH :ActionsGen(QueryList.Blob.GET_BLOBS_BY_GUIDS),

}

export default LIGHTBOX_ACTIONS
