import 'regenerator-runtime/runtime';
import {app_name} from '../firebase';
import { Record, List } from 'immutable';
import firebase from 'firebase';
import {put, call, takeEvery, all} from 'redux-saga/effects';
import { convertsEventsDataResponse } from '../utils';
import { createSelector } from 'reselect';

// Contstants
export const moduleName = 'events';
const prefix = `${app_name}/${moduleName}`;
export const GET_EVENTS_REQUEST = `${prefix}/GET_EVENTS_REQUEST`;
export const GET_EVENTS_START = `${prefix}/GET_EVENTS_START`;
export const GET_EVENTS_SUCCESS = `${prefix}/GET_EVENTS_SUCCESS`;

const ReducerRecord = Record({
  events: new List([]),
  loading: false,
  laoded: false
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
					.set('events', convertsEventsDataResponse(payload, EventsRecord))
					.set('loading', false)
					.set('laoded', true);

		default: 
			return store;
	}
}

// Selectors

export const stateSelector = (state) => state[moduleName];
export const eventsSelector = createSelector(stateSelector,  (state) => state.events);
export const loadingSelector = createSelector(stateSelector,  (state) => state.loading);
export const loadedSelector = createSelector(stateSelector,  (state) => state.loaded);


// AC
export function getEvents(){
	return {
		type: GET_EVENTS_REQUEST
	};
}

// Saga
export function* getEventsSaga(action){
	const ref = firebase.database().ref('events');

	yield put({
		type: GET_EVENTS_START
	});

	const snapshot = yield call([ref, ref.once], 'value');

	yield put({
		type: GET_EVENTS_SUCCESS,
		payload: snapshot.val()
	})
}

export const saga = function* (){
    yield all([takeEvery(GET_EVENTS_REQUEST, getEventsSaga)]);
}