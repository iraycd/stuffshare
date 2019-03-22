import { combineReducers } from 'redux';

import { DictionaryReducer, LanguageReducer, LoaderReducer ,UserReducer} from './../App/index.js';

import NotificationReducer from '../App/Reducers/Notifications/reducer.js';

NotificationReducer
console.log(UserReducer);
const combainReducer = combineReducers({
    DictionaryReducer,
    LanguageReducer, 
    LoaderReducer,
    NotificationReducer,
    UserReducer
});


export default combainReducer;