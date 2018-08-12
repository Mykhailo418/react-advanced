import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import {type as personType} from '../people/PersonCardDraggable';

class EventCard extends Component{
	static proptypes = {
		event: PropTypes.object.isRequired,
    style: PropTypes.object
	}

	render(){
    const {event,  style, connectDropTarget, canDrop, hovered } = this.props;
    const borderColor = canDrop ? (hovered ? 'red' : 'green') : 'transparent';
		return(connectDropTarget(
      <div className="event-card" style={{border: `1px solid ${borderColor}` ,...style}}>
        <h5>{event.title}</h5>
        <ul>
          <li><strong>ID:</strong> {event.uid}</li>
          <li><strong>When:</strong> {event.when}</li>
          <li><strong>Where:</strong> {event.where}</li>
        </ul>
      </div>
    ) );
	}
}

const spec = {
  drop(props, monitor) {
    console.log('---', 'person = ',  monitor.getItem().id, 'event = ', props.event.uid);
  }
}
 const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default  DropTarget([personType], spec, collect)(EventCard);
