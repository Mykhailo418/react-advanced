import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CustomComponent extends Component{
    static propTypes = {}

    render(){
      return (
        <div className="list-group">
          {this.getChildlren()}
        </div>
      );
    }

    getChildlren = () => {
      return React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, {stage: index + 1, handleClick: this.stepHandleClick})
      });
    }

    stepHandleClick = stage => e => {
      e.preventDefault();
      console.log('Stage: ', stage)
    }
}

export default CustomComponent;
