import { combineReducers } from 'redux';

import {
    NOTIFICATIONS_ACTIONS
} from './actions';

export default function NotificationReducer(state = [], action) {
    switch (action.type) {
        case NOTIFICATIONS_ACTIONS.SET_NOTIFICATION_GLOBAL:
            {
                const result = [...state];
                let notif = action.notification;
                notif.guid = global.guid();
                
                result.push(notif);
                return result;
            }
        case NOTIFICATIONS_ACTIONS.REMOVE_NOTIFICATION_GLOBAL:
            {
                const _result = [...state];
                let i=0;
                const result = _result.filter((item,index) => {
                    console.log(i);
                    console.log(action.notification);
                    return i++ != action.notification;

                });
                return result;
                //       result.edit.isLoading = false;

            }
        default:
            {
                return state;
            }
    }

}