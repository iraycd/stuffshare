import CommandList from "../../../../../../Shared/CommandList";
import QueryList from "../../../../../../Shared/QueryList";
import ActionsGen from "../../../../../App/actions";
import { NOTIFICATIONS_ACTIONS } from "../../../../../App/Reducers/Notifications/actions";
import AUTH_ACTIONS from "../../../../Reducers/Auth/action.js";


const SET_LATLNG_ACTIONS = {
  
    
    SET_USER_LATLNG :ActionsGen(CommandList.User.SET_COORDIATES),
    GET_COUNTRIES : ActionsGen(QueryList.Country.GET_COUNTRY),
    GET_CITIES:ActionsGen(QueryList.City.GET_CITY),
    SET_NOTIFICATION_GLOBAL:NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL,
    IS_AUTH:AUTH_ACTIONS.IS_AUTH,

}




export default  SET_LATLNG_ACTIONS
