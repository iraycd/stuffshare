import { combineReducers } from 'redux';

import { DictionaryReducer, LanguageReducer, LoaderReducer,NotificationReducer ,UserReducer} from './../App/index.js';

console.log(UserReducer);
const combainReducer = combineReducers({
    DictionaryReducer,
    LanguageReducer, 
    LoaderReducer,
    NotificationReducer,
    UserReducer
});


export default combainReducer;