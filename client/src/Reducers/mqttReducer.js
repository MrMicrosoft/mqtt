//import dotProp from 'dot-prop-immutable';
import {
    MQTT_TOPIC
} from '../Actions'

const beginState = {mqttReducer: "hello"};

export function mqttReducer(state = {...beginState}, action) {
    switch(action.type){
        case MQTT_TOPIC:
            console.log(action.message);
            break;
        default:
            return state;
    }
}