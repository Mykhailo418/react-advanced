import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import EventsTable from '../events/EventsTable';
import SelectedEvents from '../events/SelectedEvents';
import VirtualizedEventsTable from '../events/VirtualizedEventsTable';

class EventsPage extends Component{
	render(){
		return (
			<Fragment>
				<br />
				<div className="row">
					<div className="col-sm">
						<VirtualizedEventsTable />
					</div>
					<div className="col-sm">
						<SelectedEvents />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default EventsPage;