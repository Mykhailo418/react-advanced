import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class PersonCard extends Component{
	static proptypes = {
		person: PropTypes.object.isRequired,
    style: PropTypes.object
	}

	render(){
    const {person} = this.props;
		return(
			<div className="person-card">
        <h5>{`${person.fname} ${person.lname}`}</h5>
        <ul>
          <li><strong>ID:</strong> {person.id}</li>
          <li><strong>Email:</strong> {person.email}</li>
        </ul>
      </div>
		);
	}


}

export default PersonCard;
