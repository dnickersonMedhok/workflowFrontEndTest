import React, { Component } from 'react';


class EntityDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (<div className="App">
      <h1>The Entity Designer</h1> 
      Available entity models:
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

fetch('http://localhost:8080/getModelsByTypeId/1')
.then(res => res.json())
.then(data => this.setState({data}));


    
  }
}

export default EntityDesigner
