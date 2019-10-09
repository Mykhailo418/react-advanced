import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Step extends Component{
    static propTypes = {
      stage: PropTypes.number,
      handleClick: PropTypes.func
    }

    render(){
      const {stage, handleClick} = this.props;
      return (
        <a href="#" className="list-group-item list-group-item-action" onClick={handleClick(stage)}>
          {stage}
        </a>
      );
    }
}

export default Step;
