import React, {Component,  Fragment} from 'react';
import { DragSource } from 'react-dnd'

const wrapper = (OriginalComponent, dragSettings) => {
  const {type, spec, collect} = dragSettings;

  class DragDecorator extends Component{

      render(){
          const {connectDragSource, isDragging, ...restProps } = this.props;
          const dndStyle = {
            opacity: isDragging ? 0.3 : 1
          };
          return(
            connectDragSource(
              <div style={dndStyle}>
                <OriginalComponent {...restProps} />
              </div>
            )
          );
      }
  }

  return  DragSource(type, spec, collect)(DragDecorator);
}

export default wrapper;
