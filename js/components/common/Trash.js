import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import { type as eventRowType } from '../events/TableRow';

const componentStyle = {
  fontSize: '3em'
}

class Trash extends Component {
	 render(){
     return (
        <span style={componentStyle} class="glyphicon glyphicon-trash"></span>
     );
   }
}

const spec = {
  drop(props, monitor) {
    console.log(props, monitor);
  }
}

 const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default DropTarget([eventRowType], spec, collect)(Trash);
