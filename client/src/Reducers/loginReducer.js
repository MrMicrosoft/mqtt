//import dotProp from 'dot-prop-immutable';
import {
    REGISTER,
    REGISTER_ERROR,
    LOGIN,
    LOGIN_ERROR, UPDATE_USER_SUCESS, UPDATE_USER_ERROR
} from '../Actions'

const beginState = {};

export function loginReducer(state = {...beginState}, action) {
    switch(action.type){
        case REGISTER:
        case LOGIN:
        case UPDATE_USER_SUCESS:
            return {user: action.payload};
        case REGISTER_ERROR:
        case LOGIN_ERROR:
        case UPDATE_USER_ERROR:
            return {err:action.payload};
        default:
            return state;
    }
}