import React, { Component } from 'react';
import PropTypes from 'prop-types';
export const StepperContext = React.createContext();

class Stepper extends Component{
    static propTypes = {}
    state = {
      stage: 1
    }

    render(){
      return (
        <div className="list-group">
          <StepperContext.Provider value={this.state.stage}>
            {this.getChildlren()}
          </StepperContext.Provider>
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
      this.setState({stage});
    }
}

export default Stepper;
