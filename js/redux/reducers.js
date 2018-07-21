import {combineReducers} from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {reducer as form} from 'redux-form';
import authReducer, { moduleName as authModule } from '../widgets/auth';
import peopleReducer, { moduleName as peopleModule, ADD_PERSON, formName } from '../widgets/people';

export default combineReducers({
	router, 
	form,
	/*form: form.plugin({ // another way to reset form after submit
	    [formName]: (state, action) => { 
	      switch(action.type) {
	        case ADD_PERSON:
	          return undefined;   
	        default:
	          return state;
	      }
	    }
	}), */
	[authModule] : authReducer,
	[peopleModule] : peopleReducer,
});