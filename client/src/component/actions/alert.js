import {
    SET_ALERT,
    REMOVE_ALERT
} from './type'
import uuid from 'uuid'

export const setAlert = (msg, alertType,timeout = 5000) => dispatch => {
    const id = uuid.v4()
    dispatch({
        type: SET_ALERT,
        payload: {
            msg,
            alertType,
            id
        }
    }, console.log('msg', msg, 'alertType', alertType, 'id', id, 'dispatch', dispatch))
    
    setTimeout(() => dispatch({
        type: REMOVE_ALERT,
        payload: id
    }),timeout)
}