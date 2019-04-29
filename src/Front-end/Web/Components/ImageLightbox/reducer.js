import { combineReducers } from 'redux';
import LIGHTBOX_ACTIONS from './actions';

let emptyState = {

    open: false,
    activeImage: null,
    isLoading: false,
    imageList: []

}
export default function ImageLightboxReducer(state = Object.assign({}, emptyState), action) {
    switch (action.type) {

        case LIGHTBOX_ACTIONS.CLOSE_LIGHTBOX: {

            const result = Object.assign({}, state);
            result.open = false
            result.imageList = [];
            result.isLoading = true;
            result.activeImage = null;
            return result;
        }
        case LIGHTBOX_ACTIONS.OPEN_LIGHTBOX: {

            console.log(action);
            const result = Object.assign({}, state);
            result.open = true;
            result.imageList = action.dto.images;
            result.isLoading = true;
            result.activeImage = action.dto.activeImage;
            return result;
        }
        case LIGHTBOX_ACTIONS.GET_BLOBS_BY_GUIDS_FETCH.LOADING:
            {
                const result = Object.assign({}, state);
                result.isLoading = true;
                return result;
            }
        case LIGHTBOX_ACTIONS.GET_BLOBS_BY_GUIDS_FETCH.SUCCESS:
            {
                const result = Object.assign({}, state);
                result.imageList.forEach(item => {
                    if (item.blob_item.uid == action.dto[0].uid)
                    {
                        item.blob_item=action.data[0];
                        result.activeImage=item;
                    }
                })
                console.log()
                //result.activeImage.blob_item=action.data[0];
                result.isLoading = false;
                return result;
            }
        case LIGHTBOX_ACTIONS.GET_BLOBS_BY_GUIDS_FETCH.FINALLY:
            {
                const result = Object.assign({}, state);
                result.isLoading = false;
                return result;
            }


        default:
            {
                return state;
            }
    }

}