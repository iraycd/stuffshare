import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";




const CATEGORY_EDIT_ACTIONS = {

    GET_CATEGORY_OPTION_FETCH: ActionsGen(QueryList.CategoryOptions.GET_CATEGORY_OPTION),
    DELETE_CATEGORY_OPTIONS_FETCH: ActionsGen(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS),
    DELETE_CATEGORY_OPTIONS_TEMPLATE_FETCH: ActionsGen(CommandList.Category_Options.DELETE_CATEGORY_OPTIONS_TEMPLATE),
    UPSERT_CATEGORY_OPTIONS_FETCH: ActionsGen(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS),
    UPSERT_CATEGORY_OPTIONS_TEMPLATE_FETCH: ActionsGen(CommandList.Category_Options.UPSERT_CATEGORY_OPTIONS_TEMPLATE),
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
    ADD_EMPTY_OPTION:'ADD_EMPTY_OPTION',
    ADD_EMPTY_OPTION_ELEMENT:'ADD_EMPTY_OPTION_ELEMENT',
    UPDATE_EMPTY_ELEMENT:'UPDATE_EMPTY_ELEMENT',
    CLEAN:'CLEAN_OLD_ELEMENTS_OPTION'

}




export default CATEGORY_EDIT_ACTIONS
