import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from "redux-thunk";
import logger from 'redux-logger'
import {routerMiddleware} from 'react-router-redux';
import history from '../history';

const enhancer = applyMiddleware(routerMiddleware(history),thunk,logger);

const store = createStore(reducers,{},enhancer);

// dev only
if(DEV_ENV){
	window.store = store;
}

export default store;