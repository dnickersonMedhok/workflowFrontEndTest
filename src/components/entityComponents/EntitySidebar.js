import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';

class EntitySidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []        };
        this.handleClick = this.handleClick.bind(this);
      }
 
 render() {
    return   (<div>
              Available entity models:
                    {
                        this.state.data.map((item, key) => {
                           return <div><a href="true" key={key} onClick={(e) => this.handleClick(item, e)}>{item.name}</a><br /></div> 
                        })
                    }
            </div>);
 }

 handleClick(item, e) {
    e.preventDefault();
    this.props.setEntityModel(item);
  }

 componentDidMount() {

    fetch(apiUrl.url.concat('getModelsByTypeId/1'))
    .then(res => res.json())
    .then(data => this.setState({data})); 
   
  }
}

export default EntitySidebar