import 'regenerator-runtime/runtime';
import firebase from 'firebase';
import {app_name} from '../firebase';
import { Record, List } from 'immutable';
import {put, call, takeEvery, select, all, take, fork, cancel, spawn, cancelled} from 'redux-saga/effects';
import { delay, eventChannel } from 'redux-saga';
import {generateId} from '../utils';
import { reset } from 'redux-form';
import { createSelector } from 'reselect';
import { convertsDataResponse, convertsPeopleToRequest } from '../utils';
import {REMOVE_EVENT_SUCCESS} from './events';

// Constants
export const moduleName = 'people';
export const formName = 'people';
const prefix = `${app_name}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;
export const GET_PEOPLE_REQUEST = `${prefix}/GET_PEOPLE_REQUEST`;
export const GET_PEOPLE_SUCCESS = `${prefix}/GET_PEOPLE_SUCCESS`;
export const UPDATE_PEOPLE_SUCCESS = `${prefix}/UPDATE_PEOPLE_SUCCESS`;

export const ADD_EVENT_REQUEST = `${prefix}/ADD_EVENT_REQUEST`;
export const ADD_EVENT_SUCCESS = `${prefix}/ADD_EVENT_SUCCESS`;
export const ADD_EVENT_ERROR = `${prefix}/ADD_EVENT_ERROR`;


const ReducerRecord = Record({
  people: List([]),
  loading: false,
  loaded: false
});

const PersonRecord = Record({
	uid: null,
	id: null,
	fname: null,
	lname: null,
	email: null,
	events: List([])
});

export default function reducer(state = new ReducerRecord(), action) {
	const {type, payload} = action;
	switch(type){
		case ADD_PERSON:
			return  state.update('people', (list) =>{
				return list.push(new PersonRecord({...payload}));
			});

		case GET_PEOPLE_SUCCESS:
			return state.set('people', convertsDataResponse(payload, PersonRecord) );

		case ADD_EVENT_SUCCESS:
			return state.update('people', (people) => {
				return people.map((person) => {
					if(person.get('id') == payload.personId){
						return person.set('events', List( payload.events));
					}
					return person;
				});
			})

    case UPDATE_PEOPLE_SUCCESS:
      return state.set('people', payload.people);

		case ADD_EVENT_ERROR:
			console.error(payload.error);
		default:
			return state;
	}
}

// Selectors
export const stateSelector = (state) => state[moduleName];
export const peopleSelector = createSelector(stateSelector,  (state) => state.people);
export const loadingSelector = createSelector(stateSelector,  (state) => state.loading);
export const loadedSelector = createSelector(stateSelector,  (state) => state.loaded);
export const peopleListSelector = createSelector(peopleSelector,  (people) => {
	return people.valueSeq().toArray();
});
export const uidSelector = (_, props) => props.id;
export const personSelector = createSelector(
  stateSelector,
  uidSelector,
  (state, id) => state.people.find((person) => person.id === id)
);


// Action Creators
/*export function addPerson({fname, lname, email}) {
	// Using thunk because Date.now() is considered as a side effect
	return (dispatch) => {
		dispatch({
			type: ADD_PERSON,
			payload: {
				person: {id: Date.now(), fname, lname, email}
			}
		});
	}
}*/
export function addPerson({fname, lname, email}){
	return {
		type: ADD_PERSON_REQUEST,
		payload: {fname, lname, email}
	}
}

export function getPeople(){
	return {
		type: GET_PEOPLE_REQUEST
	}
}

export function addEvents({eventId, personId}){
	return {
		type: ADD_EVENT_REQUEST,
		payload: { eventId, personId }
	}
}

// Saga
export function* addPersonSaga (action) {
    const id = yield call(generateId);
    const person = {...action.payload, id};
    const ref = firebase.database().ref('people');

    const addPersonConst = yield call([ref, ref.push], person);
    if(addPersonConst.key){
	    yield put({
	        type: ADD_PERSON,
	        payload: person
	    });
	}else{
		yield put({
	        type: ADD_PERSON_ERROR,
	        error: addPersonConst
	    });
	}
    yield put(reset(moduleName));
}

export function* getPeopleSaga(action){
 	while (true) {
        yield take(GET_PEOPLE_REQUEST);
        const state = yield select(stateSelector);
    		const loaingState = yield select(loadingSelector);
    		const loadedState = yield select(loadedSelector);

    		if (loaingState || loadedState){ continue; }

    	yield call(fetchPeopleSaga);
    }
}

export function* fetchPeopleSaga(){
  const ref = firebase.database().ref('people');

  const snapshot = yield call([ref, ref.once], 'value');
  console.log(snapshot.val());
  yield put({
    type: GET_PEOPLE_SUCCESS,
    payload: snapshot.val()
  })
}

export function* addEventSaga(action){
	const {eventId, personId} = action.payload;
	const state = yield select(stateSelector);
	const person = state.get('people').find((person) => person.get('id') === personId);

	if(!person || person.events.includes(eventId)){ return };

	  const ref = firebase.database().ref(`people/${person.uid}/events`);
    const events = person.get('events').toJS().concat(eventId);
    try{
    	yield call([ref, ref.set], events);

    	// yield put({
    	// 	type: ADD_EVENT_SUCCESS,
    	// 	payload: {personId, events}
    	// });
      yield put({type: GET_PEOPLE_REQUEST});
    }catch(error){
		yield put({
    		type: ADD_EVENT_ERROR,
    		payload: {error}
    	});
    }
}

export function* removeEventSaga(action){
     const {uid} = action.payload;
     const state = yield select(stateSelector);
     const peopleUpdated = state.get('people').map((person) => {
       return person.update('events',(events) => {
         return events.filter((event) => event != uid);
       });
     });
     const ref = firebase.database().ref('people');
     try{
       yield call([ref, ref.update], convertsPeopleToRequest(peopleUpdated));

       yield put({
          type: UPDATE_PEOPLE_SUCCESS,
          payload: {people: peopleUpdated}
       })
     }catch(e){
       console.error(e);
     }
}

// Cancelable Saga
export function* cancelablePeopleSyncSaga(){
    const process = yield fork(syncPeopleSaga);
    yield delay(6000);
    yield cancel(process);
}

// Background Loading People
export function* syncPeopleSaga(){
  try{
    while(true){
      yield call(fetchPeopleSaga);
      yield delay(2000);
    }
  } finally{
        if (yield cancelled()) console.log('---', 'syncPeopleSaga was canceled')
  }
}

// Create Event Channel
export const createEventChannel = () => {
  return eventChannel((emit) => {
    const callback = (data) => {
      return emit({data});
    }
    const ref = firebase.database().ref('people');

    ref.on('value', callback);

    return () => ref.off('value', callback);
  })
}

// Real Time
export function* realtimeSyncSaga(){
  const channel = yield call(createEventChannel);
  while(true){
    const { data } = yield take(channel);
    console.log('realtimeSyncSaga', data);
    yield put({
      type: GET_PEOPLE_SUCCESS,
      payload: data.val()
    })
  }
}

export const saga = function * () {
    yield spawn(realtimeSyncSaga);
    yield all([
    	takeEvery(ADD_PERSON_REQUEST, addPersonSaga),
    	getPeopleSaga(),
    	takeEvery(ADD_EVENT_REQUEST, addEventSaga),
      takeEvery(REMOVE_EVENT_SUCCESS, removeEventSaga)
    ])
}
