import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Stepper from '../compounts/Stepper';
import Step from '../compounts/Step';

class CompoundComponentsPage extends Component{
    static propTypes = {}

    render(){
      return (
        <section>
          <h1>Compound Component</h1>
          <Stepper>
            <Step />
            <Step />
            <Step />
            <Step />
            <Step />
          </Stepper>
        </section>
      );
    }
}

export default CompoundComponentsPage;
