import {app_name} from '../firebase';
import { Record, List } from 'immutable';

// Constants
export const moduleName = 'people';
const prefix = `${app_name}/${moduleName}`;
export const ADD_PERSON = `${prefix}/ADD_PERSON`;

export const ReducerRecord = Record({
  people: List([])
});

export default function reducer(state = new ReducerRecord(), action) {
	const {type, payload} = action;
	console.log('-- ADD PERSON REDUCER', state);
	switch(type){

		case ADD_PERSON:
			return  state.updateIn(['people'], (list) =>{
				return list.push({...payload.person});
			});

		default:
			return state;
	}
}

// Action Creators
export function addPerson({fname, lname, email}) {
	return {
		type: ADD_PERSON,
		payload: {
			person: {fname, lname, email}
		}
	}
}