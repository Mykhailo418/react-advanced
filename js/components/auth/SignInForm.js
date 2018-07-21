import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { signInFormName } from '../../widgets/auth';

class SignInForm extends Component{
	static propTypes = {
		match: PropTypes.object,
		handleSubmit: PropTypes.func
	}

	render(){
		return(
			<Fragment>
				<h2>Sign In Form</h2>
				<form onSubmit={this.props.handleSubmit}>
					<div className="form-group">
					    <label htmlFor="signEmail">Email:</label>
					    <Field name="email" component="input" className="form-control" id="signEmail" />
					</div>
					<div className="form-group">
					    <label htmlFor="signPass">Password:</label>
					    <Field name="password" component="input" className="form-control" type="password" id="signPass" />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</Fragment>
		);
	}

}

export default reduxForm({ form: signInFormName})(SignInForm);