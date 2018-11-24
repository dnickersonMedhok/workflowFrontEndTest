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
      Available form models:
      <ul>
                {
                    this.state.data.map((item) => {
                       return <li key={item.id}>{item.name} </li>
                    })
                }
            </ul>
      </div>
);
  }

  componentDidMount() {

    fetch(apiUrl.url.concat('getModelsByTypeId/2'))
    .then(res => res.json())
    .then(data => this.setState({data})); 
   
  }
}

export default FormDesigner
