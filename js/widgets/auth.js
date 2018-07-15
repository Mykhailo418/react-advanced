import {app_name} from '../firebase';
import { Record } from 'immutable';
import firebase from 'firebase/app';

// Constants
export const moduleName = 'auth';
const prefix = `${app_name}/${moduleName}`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;

// Selectors
export const isAuthorizedSelector = (state) => !!state[moduleName].user;


// Reducer
export const ReducerRecord = Record({
  user: null,
  loading: true
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
  	case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      	return state
                .set('user', payload.user)
                .set('loading', false);

    case SIGN_IN_ERROR:
    case SIGN_IN_ERROR:
    	console.error(type, payload.error);
    	return state.set('loading', false);

    default:
      	return state;
  }
}

/**
 * Selectors
 * */

/**
 * Action Creators
 * */

export function signIn({email, password}) {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
	        dispatch({
	          type: SIGN_IN_SUCCESS,
	          payload: { user }
	        });
	    }).catch((e) => {
			dispatch({
	          type: SIGN_IN_ERROR,
	          payload: { error: e }
	        });
      	});
  };
}

export function signUp({email, password}) {
  return (dispatch) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) =>{
        dispatch({
          type: SIGN_UP_SUCCESS,
          payload: { user }
        });
      }).catch((e) => {
      	dispatch({
      		type: SIGN_UP_ERROR,
      		payload: { error: e }
      	});
      });
  };
}


// Init
firebase.auth().onAuthStateChanged((user) => {
  window.store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  });
});