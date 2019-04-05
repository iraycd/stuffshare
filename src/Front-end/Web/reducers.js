import { combineReducers } from 'redux';

import { DictionaryReducer, LoaderReducer ,UserReducer} from './../App/index.js';

import NotificationReducer from '../App/Reducers/Notifications/reducer.js';
import * as Reducers from './reducers.scenes.js' ;

console.log(Reducers.default)
const combainReducer = combineReducers({
    ...Reducers.default,
    DictionaryReducer,
   // LanguageReducer, 
    LoaderReducer,
    NotificationReducer,
    UserReducer
});


export default combainReducer;