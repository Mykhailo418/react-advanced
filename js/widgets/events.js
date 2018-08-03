import 'regenerator-runtime/runtime';
import {app_name} from '../firebase';
import { Record, List, OrderedSet } from 'immutable';
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
export const SELECT_EVENT = `${prefix}/SELECT_EVENTS`;

const ReducerRecord = Record({
  events: new List([]),
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
			const {eventIndex} = payload;
			const uid = store.events.get(eventIndex).get('uid');
			return store.selected.contains(uid) ? 
					store.update('selected', (selected) => {
						return selected.remove(uid)
					})  :
					store.update('selected', (selected) => {
						return selected.add(uid)
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
export const selectedEventsSelector = createSelector(stateSelector,  (state) => {
	return state.events.filter((event)=> state.selected.contains(event.uid));
});


// AC
export function getEvents(){
	return {
		type: GET_EVENTS_REQUEST
	};
}

export function selectEvent(eventIndex){
	return {
		type: SELECT_EVENT,
		payload: {eventIndex}
	};
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

export const saga = function* (){
    yield all([getEventsSaga()]);
}