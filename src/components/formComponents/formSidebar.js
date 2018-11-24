import React, { Component } from 'react';

import Popup from "reactjs-popup";
import FormPreview from './formPreview';
import { apiUrl } from '../../resources/apiUrl';

class FormSidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []
        };
      }
 
 render() {
    return   (<div>
              Available form models:
                 <ul>
                    {
                        this.state.data.map((item) => {
                        return <li key={item.id}>{item.name} </li>
                    })
                    }
                </ul>
        <Popup trigger={<button> preview</button>} position="bottom left">
            <FormPreview />
        </Popup>
  </div>);
 }

 componentDidMount() {

    fetch(apiUrl.url.concat('getModelsByTypeId/2'))
    .then(res => res.json())
    .then(data => this.setState({data})); 
   
  }
}

export default FormSidebar