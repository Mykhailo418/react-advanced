import 'regenerator-runtime/runtime';
import {app_name} from '../firebase';
import { Record, List } from 'immutable';
import {put, call, takeEvery} from 'redux-saga/effects';
import {generateId} from '../utils';
import { reset } from 'redux-form';

// Constants
export const moduleName = 'people';
export const formName = 'people';
const prefix = `${app_name}/${moduleName}`;
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;

const ReducerRecord = Record({
  people: List([])
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

		default:
			return state;
	}
}

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

// Saga
export function* addPersonSaga (action) {
    const id = yield call(generateId);
    console.log('-- Add person saga id = ', id);
    yield put({
        type: ADD_PERSON,
        payload: {...action.payload, id}
    });
    yield put(reset(moduleName));
}

export const saga = function * () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}