import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import EventsTable from '../events/EventsTable';
import SelectedEvents from '../events/SelectedEvents';
import VirtualizedEventsTable from '../events/VirtualizedEventsTable';
import Trash from '../common/Trash';

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
						<Trash />
						<SelectedEvents />
					</div>
				</div>
			</Fragment>
		);
	}
}

export default EventsPage;
