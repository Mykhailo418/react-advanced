import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import ErrorField from '../common/ErrorField';
import { signInFormName } from '../../widgets/auth';

class SignUpForm extends Component{
	static propTypes = {
		handleSubmit: PropTypes.func
	}

	render(){
		return(
			<Fragment>
				<h2>Sign Up Form</h2>
				<form onSubmit={this.props.handleSubmit}>
					<Field label="Email" name="email" component={ErrorField} idField="signUpEmail" />
					<Field label="Password" name="password" type="password" component={ErrorField} idField="signUpPass" />
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</Fragment>
		);
	}
}

const validate = ({ email, password }) => {
	const emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	const errors = {};

  	if (!email) errors.email = 'email is a required field';
 	else if (!emailExp.test(email)) errors.email = 'email is invalid';

  	if (!password) errors.password = 'password is a required field';
  	else if (password.length < 8) errors.password = 'password is too short';

  	return errors;
}

export default reduxForm({ form: signInFormName, validate})(SignUpForm);