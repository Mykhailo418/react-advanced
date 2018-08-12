import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import dragDecoratorWrapper from '../common/decorators/DragDecorator';
import PersonCard from './PersonCard';

export const type = 'person';

const spec = {
  beginDrag(props) {
    return {
      id: props.person.id
    }
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default dragDecoratorWrapper(PersonCard, {type, spec, collect});
