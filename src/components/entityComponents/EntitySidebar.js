import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';

class EntitySidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []
        };
      }
 
 render() {
    return   (<div>
              Available entity models:
                 <ul>
                    {
                        this.state.data.map((item) => {
                        return <li key={item.id}>{item.name} </li>
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

export default EntitySidebar