import { all } from 'redux-saga/effects';
import { saga as peopleSaga } from '../widgets/people';
import { saga as authSaga } from '../widgets/auth';
import { saga as eventsSaga } from '../widgets/events';

export default function* (){
 	yield all([peopleSaga(), authSaga(), eventsSaga()])
}