import 'regenerator-runtime/runtime';
import {app_name} from '../firebase';
import { Record, List, OrderedSet, OrderedMap } from 'immutable';
import firebase from 'firebase';
import {put, call, takeEvery, all, select, take} from 'redux-saga/effects';
import { convertsEventsDataResponse } from '../utils';
import { createSelector } from 'reselect';

// Contstants
export const moduleName = 'events';
const prefix = `${app_name}/${moduleName}`;
export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`;
export const GET_EVENTS_START = `${prefix}/GET_EVENTS_START`;
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`;

export const REMOVE_EVENT_REQUEST = `${prefix}/REMOVE_EVENT_REQUEST`;
export const REMOVE_EVENT_SUCCESS = `${prefix}/REMOVE_EVENT_SUCCESS`;
export const REMOVE_EVENT_ERROR = `${prefix}/REMOVE_EVENT_ERROR`;

export const SELECT_EVENT = `${prefix}/SELECT_EVENTS`;

const ReducerRecord = Record({
  events: new OrderedMap(),
  loading: false,
  loaded: false,
  selected: new OrderedSet([])
});

const EventsRecord = Record({
  uid: null,
  month: null,
  submissionDeadline: null,
  title: null,
  url: null,
  when: null,
  where: null
});

// Reducers
export default function reducer(store = new ReducerRecord([]), action){
	const {type, payload} = action;
	switch(type){
		case GET_EVENTS_START:
			return store.set('loading', true);

		case GET_EVENTS_SUCCESS:
			return store
					.mergeIn(['events'], convertsEventsDataResponse(payload, EventsRecord))
					.set('loading', false)
					.set('loaded',  Object.keys(payload).length < 10);

		case SELECT_EVENT:
			const {uid} = payload;
			return store.selected.contains(uid) ?
					store.update('selected', (selected) => {
						return selected.remove(uid)
					})  :
					store.update('selected', (selected) => {
						return selected.add(uid)
					});

    case REMOVE_EVENT_SUCCESS:
      return store
              .removeIn(['events', payload.uid])
              .update('selected', (selected) => {
    						return selected.remove(payload.uid)
    					});

		default:
			return store;
	}
}

// Selectors

export const stateSelector = (state) => state[moduleName];
export const eventsSelector = createSelector(stateSelector,  (state) => state.events);
export const loadingSelector = createSelector(stateSelector,  (state) => state.loading);
export const loadedSelector = createSelector(stateSelector,  (state) => state.loaded);
export const eventsListSelector = createSelector(eventsSelector,  (events) => {
	return events.valueSeq().toArray();
});
export const selectedEventsSelector = createSelector(eventsSelector, stateSelector, (events, state) => {
	return events.filter((event)=> state.selected.has(event.uid));
});


// AC
export function getEvents(){
	return {
		type: GET_EVENTS_REQUEST
	};
}

export function selectEvent(uid){
	return {
		type: SELECT_EVENT,
		payload: {uid}
	};
}

export function removeEvent(uid){
  return {
    type: REMOVE_EVENT_REQUEST,
    payload: {uid}
  }
}

// Saga
export function* getEventsSaga(action){
	 while (true) {
        yield take(GET_EVENTS_REQUEST);
		const state = yield select(stateSelector);
		const loaingState = yield select(loadingSelector);
		const loadedState = yield select(loadedSelector);

		if (loaingState || loadedState){ continue; }

		yield put({
			type: GET_EVENTS_START
		});

		const lastEvent = state.events.last();
		const ref = firebase.database().ref('events')
			 		.orderByKey()
		            .limitToFirst(10)
		            .startAt(lastEvent ? lastEvent.uid : '');

		const snapshot = yield call([ref, ref.once], 'value');
		console.log('--load events', snapshot.val());
		yield put({
			type: GET_EVENTS_SUCCESS,
			payload: snapshot.val()
		})
	}
}

export function* removeEventSaga(action){
    const {uid} = action.payload;
    const ref = firebase.database().ref(`events/${uid}`);

    try{
      yield call([ref, ref.remove]);
      yield put({
    		type: REMOVE_EVENT_SUCCESS,
    		payload: {uid}
    	});
    }catch(e){
      yield put({
  			type: REMOVE_EVENT_ERROR,
  			payload: snapshot.val()
  		})
    }
}

export const saga = function* (){
    yield all([
      getEventsSaga(),
      takeEvery(REMOVE_EVENT_REQUEST, removeEventSaga)
    ]);
}
