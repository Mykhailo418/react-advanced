import { signUpSaga, signInSaga, signOutSaga,
	SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_ERROR,
	SIGN_IN_REQUEST, SIGN_IN_SUCCESS, SIGN_IN_ERROR, 
	SIGN_OUT_SUCCESS, SIGN_OUT_ERROR } from '../widgets/auth';
import {put, call, take, all, cps, takeEvery} from 'redux-saga/effects';
import firebase from 'firebase/app';
import {push} from 'react-router-redux';

describe('Auth Tests', () =>{
	const auth = firebase.auth();

	it('sign up', () => {
		const user = {
	        email: 'test@test.com',
	        password: 'test12345'
	    };
	    const saga = signUpSaga();
	    const ac = {
		    type: SIGN_UP_REQUEST,
		    payload: user
		};
		const error = new Error;

		expect(saga.next().value).toEqual(take(SIGN_UP_REQUEST));
		expect(saga.next(ac).value).toEqual(call([auth, auth.createUserWithEmailAndPassword], user.email, user.password));
		expect(saga.next(user).value).toEqual(put({type: SIGN_UP_SUCCESS, payload: { user }}));
		expect(saga.throw(error).value).toEqual(put({ type: SIGN_UP_ERROR, payload: { error } }));
	});

	it('sign in', () => {
		const user = {
	        email: 'smm@mailc.om',
	        password: '1q2w3e4r5t6y'
	    };
	    const saga = signInSaga();
	    const ac = {
		    type: SIGN_IN_REQUEST,
		    payload: user
		};
		let user_signed;
		const error = new Error;

		expect(saga.next().value).toEqual(take(SIGN_IN_REQUEST));
		expect(saga.next(ac).value).toEqual(user_signed = call([auth, auth.signInWithEmailAndPassword], user.email, user.password));
		expect(saga.next(user_signed).value).toEqual(put({
              type: SIGN_IN_SUCCESS,
              payload: { user : user_signed.user || user_signed }
        }));
        expect(saga.throw(error).value).toEqual(put({ type: SIGN_IN_ERROR, payload: { error } }));
	});

	it('sign out', () => {
		const saga = signOutSaga();
		const error = new Error;

		expect(saga.next().value).toEqual(call([auth, auth.signOut]));
		expect(saga.next().value).toEqual(put({type: SIGN_OUT_SUCCESS}));
		expect(saga.next().value).toEqual(put(push('/auth/signin')));

		expect(saga.throw(error).value).toEqual(put({
	        type: SIGN_OUT_ERROR,
	        payload: { error }
	     }));
	});

});