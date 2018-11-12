import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';

class WorkflowDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (<div className="App">
      <h1><b>The Workflow Designer</b></h1> 
      Available workflow models:
      <ul>
                {
                    this.state.data.map((item, key) => {
                       return <li key={key}>{item.name} </li>
                    })
                }
            </ul>
      </div>);
  }

  componentDidMount() {

fetch(apiUrl.url.concat('getModelsByTypeId/3'))
.then(res => res.json())
.then(data => this.setState({data}));


    
  }
}

export default WorkflowDesigner
