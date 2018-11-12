import React, { Component } from 'react';


class FormDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (<div className="App">
      <h1>The Form Designer</h1> 
      Available form models:
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

fetch('http://localhost:8080/getModelsByTypeId/2')
.then(res => res.json())
.then(data => this.setState({data}));


    
  }
}

export default FormDesigner
