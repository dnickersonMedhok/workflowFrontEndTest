import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';

class FormDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  render() {
    return (<div className="App">
              <h1><b>The Form Designer</b></h1> 
            </div>
);
  }

  componentDidMount() {

   
  }
}

export default FormDesigner
