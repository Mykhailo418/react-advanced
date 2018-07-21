import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import ErrorField from '../common/ErrorField';
import { formName } from '../../widgets/people';

class AddPersonForm extends Component{
	static propTypes = {
		handleSubmit: PropTypes.func
	}

	render(){
		return(
			<Fragment>
				<h2>Add Person</h2>
				<form onSubmit={this.props.handleSubmit}>
					<Field label="First Name:" name="fname" component={ErrorField} idField="firstNamePerson" />
					<Field label="Last Name:" name="lname" component={ErrorField} idField="lastNamePerson" />
					<Field label="Email:" name="email" component={ErrorField} idField="emailPerson" />
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</Fragment>
		);
	}
}

const validate = ({fname, lname, email}) => {
	const emailExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  	const errors = {};

  	if (!email) errors.email = 'email is a required field';
 	else if (!emailExp.test(email)) errors.email = 'email is invalid';

  	if (!fname) errors.fname = 'First Name is a required field';
  	else if (fname.length < 2) errors.fname = 'First Name is too short';

  	if (!lname) errors.lname = 'Last Name is a required field';
  	else if (lname.length < 2) errors.lname = 'Last Name is too short';

  	return errors;
}

export default reduxForm({ form: formName, validate})(AddPersonForm);