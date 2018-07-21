import {createStore, applyMiddleware, compose} from 'redux';
import reducers from './reducers';
import logger from 'redux-logger'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import history from '../history';
import createSagaMiddleware from 'redux-saga';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const enhancer = applyMiddleware(sagaMiddleware, routerMiddleware(history));

const store = createStore(connectRouter(history)(reducers), enhancer);

sagaMiddleware.run(saga);

// dev only
if(DEV_ENV){
	window.store = store;
}

export default store;