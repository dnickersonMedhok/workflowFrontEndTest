import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';

class EntityDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (<div className="App">
      <h5><b>The Entity Designer</b></h5> 
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
    fetch(apiUrl.url.concat('getModelsByTypeId/1'))
    .then(res => res.json())
    .then(data => this.setState({data}));
  }
}

export default EntityDesigner
