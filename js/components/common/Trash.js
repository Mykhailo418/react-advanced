import React, {Component} from 'react';
import { DropTarget } from 'react-dnd';
import { type as eventRowType } from '../events/TableRow';

let componentStyle = {
  fontSize: '3em'
}

class Trash extends Component {
	 render(){
     const {canDrop, hovered, connectDropTarget} = this.props;
     const color = canDrop ? (hovered ? 'red' : 'green') : 'black';
     console.log(eventRowType);
     return (
        connectDropTarget(
            <i style={{color ,...componentStyle}} className="fa fa-trash-o"></i>
        )
     );
   }
}

const spec = {
  drop(props, monitor) {
    console.log('DROP:',props, monitor.getItem());
    return monitor.getItem();
  }
}

 const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver()
})

export default DropTarget([eventRowType], spec, collect)(Trash);
