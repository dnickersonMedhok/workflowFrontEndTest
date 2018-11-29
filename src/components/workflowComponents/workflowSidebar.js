import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';

class WorkflowSidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []        };
        this.handleClick = this.handleClick.bind(this);
      }
 
 render() {
    return   (<div>
              Available workflow models:
                    {
                        this.state.data.map((item, key) => {
                           return <div><a href="true" key={key} onClick={(e) => this.handleClick(item, e)}>{item.name}</a><br /></div> 
                        })
                    }
            </div>);
 }

 handleClick(item, e) {
    e.preventDefault();
    this.props.setWorkflowModel(item);
  }

 componentDidMount() {

    fetch(apiUrl.url.concat('getModelsByTypeId/3'))
    .then(res => res.json())
    .then(data => this.setState({data})); 
   
  }
}

export default WorkflowSidebar