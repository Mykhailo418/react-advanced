import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {StepperContext} from './Stepper';

class Step extends PureComponent{
    static propTypes = {
      stage: PropTypes.number,
      handleClick: PropTypes.func
    }

    render(){
      console.log('STEP RENDER', this.props.stage);
      return (
        <StepperContext.Consumer>
          {value => this.getLink(value)}
        </StepperContext.Consumer>
      );
    }

    getLink = currentStage => {
      const {stage, handleClick} = this.props;
      let classes = 'list-group-item list-group-item-action';
      if(currentStage === stage) classes += ' active';
      return (
          <a href="#" className={classes} onClick={handleClick(stage)}>
          {stage}
        </a>
      )
    }
}

export default Step;
