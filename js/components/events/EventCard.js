import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import {type as personType} from '../people/PersonCardDraggable';
import { connect } from 'react-redux';
import {peopleListSelector, addEvents} from '../../widgets/people';

class EventCard extends Component{
	static proptypes = {
		event: PropTypes.object.isRequired,
    style: PropTypes.object,
    people: PropTypes.array
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
          {this.getPeopleList()}
        </ul>
      </div>
    ) );
	}

  getPeopleList = () => {
    const {people} = this.props;
    if(!people || !people.length){ return null;}

    let list = people.map((person) => <li key={person.id}>{`${person.fname} ${person.lname}`}</li>);
    return (
      <li><strong>Visitors:</strong>
        <ul>
            {list}
        </ul>
      </li>
    );

  }
}

const spec = {
  drop(props, monitor) {
    props.addEvents({eventId: props.event.uid, personId: monitor.getItem().id});
    return { eventUid: props.event.uid };
  }
}
 const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

 function mapToProps(state, props){
    const peopleList = peopleListSelector(state);
    const {event} = props;
    return{
      people: peopleList.filter((person) => person.events.includes(event.uid))
    }
 }

export default  connect(mapToProps, {addEvents})(DropTarget([personType], spec, collect)(EventCard));
