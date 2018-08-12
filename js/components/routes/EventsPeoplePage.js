import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import PersonListDraggable from '../people/PersonListDraggable';
import SelectedEvents from '../events/SelectedEvents';

class EventsPeoplePage extends Component{
	render(){
		return (
			<Fragment>
        <h2>Drag People to events</h2>
        <div className="row">
          <div className="col-sm-6">
            <PersonListDraggable />
          </div>
          <div className="col-sm-6">
            <SelectedEvents />
          </div>
        </div>
			</Fragment>
		);
	}
}

export default EventsPeoplePage;
