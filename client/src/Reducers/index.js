import {applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import { mqttReducer } from './mqttReducer';
import {loginReducer} from './loginReducer';
import {createStore, compose} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    mqtt: mqttReducer,
    login: loginReducer
});

const loggerMiddleWare = applyMiddleware(createLogger());
const thunkMiddelWare = applyMiddleware(thunk);

const store =  createStore(reducers, {}, compose(loggerMiddleWare,thunkMiddelWare));

export default store;