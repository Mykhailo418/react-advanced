import 'regenerator-runtime/runtime';
import {app_name} from '../firebase';
import { Record } from 'immutable';
import firebase from 'firebase/app';
import { reset } from 'redux-form';
import {push} from 'react-router-redux'

import {put, call, take, all, cps, takeEvery} from 'redux-saga/effects';

// Constants
export const moduleName = 'auth';
export const signUpFormName = 'signUp';
export const signInFormName = 'signIn';
const prefix = `${app_name}/${moduleName}`;
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`;
export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`;
export const SIGN_OUT_REQUEST = `${prefix}/SIGN_OUT_REQUEST`;

export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`;
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`;
export const SIGN_OUT_ERROR = `${prefix}/SIGN_OUT_ERROR`;

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
                .set('loading', false)
                .set('user', payload.user);

    case SIGN_IN_ERROR:
    case SIGN_IN_ERROR:
    	console.error(type, payload.error);
    	return state.set('loading', false);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();

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

/*export function signIn({email, password}) {
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
}*/

/*export function signUp({email, password}) {
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
}*/
export function signUp({email, password}) {
  return {
    type: SIGN_UP_REQUEST,
    payload: {email, password}
  };
}
export function signIn({email, password}) {
  return {
    type: SIGN_IN_REQUEST,
    payload: {email, password}
  };
}
export function signOut() {
   console.log(0);
  return {
    type: SIGN_OUT_REQUEST,
  };
}

// Saga

export function* signOutSaga(){
  console.log('-- signOutSaga');
    const auth = firebase.auth();
    try{
      yield call([auth, auth.signOut]);
      yield put({
            type: SIGN_OUT_SUCCESS
      });
      yield put(push('/auth/signin'));
    }catch(error){
      put({
        type: SIGN_OUT_ERROR,
        payload: { error }
      });
    }
}

export function* signInSaga(){
    const auth = firebase.auth();
    while(true){
      const action = yield take(SIGN_IN_REQUEST);
      const {email, password} = action.payload;
      try{
        const user = yield call([auth, auth.signInWithEmailAndPassword], email, password);
        yield put({
              type: SIGN_IN_SUCCESS,
              payload: { user : user.user || user }
        });
        yield put(push('/auth/signup'));
      }catch(error){
        yield put({
          type: SIGN_IN_ERROR,
          payload: { error }
        });
      }
    }
}

export function* signUpSaga(){
  console.log('-- signUpSaga');
  const auth = firebase.auth();
  //while(true){
    const action = yield take(SIGN_UP_REQUEST);
    const {email, password} = action.payload;
    try{
      const user = yield call([auth, auth.createUserWithEmailAndPassword], email, password);
      yield put({
          type: SIGN_UP_SUCCESS,
          payload: { user }
      });
    }catch(e){
      yield put({
          type: SIGN_UP_ERROR,
          payload: { error: e }
      });
    }

  //}
}

export const watchStatusChange = function * () {
    const auth = firebase.auth();

    try {
        yield cps([auth, auth.onAuthStateChanged]);
    } catch (user) {
        yield put({
            type: SIGN_IN_SUCCESS,
            payload: {user}
        });
    }

}

export const saga = function * () {
    yield all([ signUpSaga(), watchStatusChange(), signInSaga(), takeEvery(SIGN_OUT_REQUEST, signOutSaga) ]);
}

// Init
/*firebase.auth().onAuthStateChanged((user) => {
  window.store.dispatch({
    type: SIGN_IN_SUCCESS,
    payload: { user }
  });
});*/