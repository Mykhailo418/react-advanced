import 'regenerator-runtime/runtime';
import firebase from 'firebase';
import {app_name} from '../firebase';
import { Record, List } from 'immutable';
import {put, call, takeEvery, select, all, take} from 'redux-saga/effects';
import {generateId} from '../utils';
import { reset } from 'redux-form';
import { createSelector } from 'reselect';
import { convertsDataResponse } from '../utils';

// Constants
export const moduleName = 'people';
export const formName = 'people';
const prefix = `${app_name}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;
export const ADD_PERSON_ERROR = `${prefix}/ADD_PERSON_ERROR`;
export const GET_PEOPLE_REQUEST = `${prefix}/GET_PEOPLE_REQUEST`;
export const GET_PEOPLE_SUCCESS = `${prefix}/GET_PEOPLE_SUCCESS`;

const ReducerRecord = Record({
  people: List([]),
  loading: false,
  loaded: false
});

const PersonRecord = Record({
	id: null,
	fname: null,
	lname: null,
	email: null
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

// Saga
export function* addPersonSaga (action) {
    const id = yield call(generateId);
    console.log('-- Add person saga id = ', id);
    const person = {...action.payload, id};
    const ref = firebase.database().ref('people');

    const addPersonConst = yield call([ref, ref.push], person);
    console.log('addPersonConst = ', addPersonConst);
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

		const ref = firebase.database().ref('people');

		const snapshot = yield call([ref, ref.once], 'value');
		console.log('--load events', snapshot.val());
		yield put({
			type: GET_PEOPLE_SUCCESS,
			payload: snapshot.val()
		})
    }
}

export const saga = function * () {
    yield all([takeEvery(ADD_PERSON_REQUEST, addPersonSaga), getPeopleSaga()])
}