import ActionsGen from "../../../App/actions";
import QueryList from "../../../../Shared/QueryList";
import CommandList from "../../../../Shared/CommandList";



const AUTH_ACTIONS = {
  
    
    IS_AUTH : 'IS_AUTH',
    GET_USER_INFO_FETCH :ActionsGen(QueryList.User.USER_INFO),
    LOG_OUT_FETCH : ActionsGen(CommandList.User.LOG_OUT),
    REMOVE_USER_FETCH : ActionsGen(CommandList.User.REMOVE_USER)


}




export default  AUTH_ACTIONS
