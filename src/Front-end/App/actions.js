import { Enums } from './../../Shared/index.js';

const ActionsGen = (action) => {
    return {
        SUCCESS: action + "_" + Enums.ACTIONS.SUCCESS,

        ERROR: action + "_" + Enums.ACTIONS.ERROR,

        LOADING: action + "_" + Enums.ACTIONS.LOADING,
        
        FINALLY: action + "_" + Enums.ACTIONS.FINALLY
    };
}
module.exports = { ActionsGen };