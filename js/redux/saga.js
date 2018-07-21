import { all } from 'redux-saga/effects';
import { saga as peopleSaga } from '../widgets/people';

export default function* (){
 	yield all([peopleSaga()])
}