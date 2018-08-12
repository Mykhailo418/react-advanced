import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

class PersonCard extends Component{
	static proptypes = {
		person: PropTypes.object.isRequired,
    style: PropTypes.object
	}

  componentStyle = {
    display: 'inline-block',
    width: 'auto',
    margin: '0 20px 10px 0',
    position: 'static'
  }

	render(){
    const {person,  style} = this.props;
		return(
			<div className="person-card" style={{...style, ...this.componentStyle}}>
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
