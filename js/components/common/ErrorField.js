import React from 'react';
import PropTypes from 'prop-types';

const ErrorField = ({ label, type, input, meta: { error, touched } , idField}) => {
	let errorText = touched && error && <span style={{ color: 'red' }}>{error}</span>;
	let className = (touched && error) ? "form-control is-invalid" : "form-control";
	return(
		<div className="form-group">
			<label htmlFor={idField}>{label}</label>
			<input {...input} type={type} className={className} id={idField} />
			<small className="form-text text-muted">{errorText}</small>
		</div>
	);
}
ErrorField.propTypes = {
	label: PropTypes.string,
	idField: PropTypes.string,
	input: PropTypes.object,
	type: PropTypes.string
}

export default ErrorField;