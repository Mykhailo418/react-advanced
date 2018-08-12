import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import dragDecoratorWrapper from '../common/decorators/DragDecorator';
import PersonCard from './PersonCard';
import PersonDragPreview from './PersonDragPreview';

export const type = 'person';

const spec = {
  beginDrag(props) {
    console.log('beginDrag', props.person.id);
    return {
      id: props.person.id,
      DragPreview: PersonDragPreview
    }
  },
  endDrag(props, monitor) {
        const personUid = props.person.id
        const dropRes = monitor.getDropResult()
        const eventUid = dropRes && dropRes.eventUid
         console.log('---', 'endDrag', personUid, eventUid)
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  connectPreview: connect.dragPreview(),
});

export default dragDecoratorWrapper(PersonCard, {type, spec, collect});
