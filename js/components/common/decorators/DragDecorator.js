import React, {Component,  Fragment} from 'react';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

const wrapper = (OriginalComponent, dragSettings) => {
  const {type, spec, collect} = dragSettings;

  class DragDecorator extends Component{

      componentDidMount() {
        //console.log('  this.props.connectPreview',   this.props.connectPreview);
        this.props.connectPreview ? this.props.connectPreview(getEmptyImage()) : null;
      }

      render(){
          const {connectDragSource, isDragging, connectPreview, ...restProps } = this.props;
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
  //console.log('spec = ',spec, 'collect = ', collect);
  return  DragSource(type, spec, collect)(DragDecorator);
}

export default wrapper;
