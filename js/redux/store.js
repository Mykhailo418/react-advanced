import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import thunk from "redux-thunk";
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../history';

const enhancer = applyMiddleware(thunk, routerMiddleware(history), logger);

const store = createStore(connectRouter(history)(reducers), enhancer)

// dev only
if(DEV_ENV){
	window.store = store;
}

export default store;