import {app_name} from '../firebase';
import { Record, List } from 'immutable';

// Constants
export const moduleName = 'people';
const prefix = `${app_name}/${moduleName}`;
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
	console.log('-- ADD PERSON REDUCER', state);
	switch(type){

		case ADD_PERSON:
			return  state.update('people', (list) =>{
				return list.push(new PersonRecord({...payload.person}));
			});

		default:
			return state;
	}
}

// Action Creators
export function addPerson({fname, lname, email}) {
	// Using thunk because Date.now() is considered as a side effect
	return (dispatch) => {
		dispatch({
			type: ADD_PERSON,
			payload: {
				person: {id: Date.now(), fname, lname, email}
			}
		});
	}
}