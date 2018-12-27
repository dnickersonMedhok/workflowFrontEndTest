import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { typesEnum } from '../../utilities/Constants'

class EntitySidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []        
        };
        this.getFields = this.getFields.bind(this);
        this.handleClick = this.handleClick.bind(this);
      }

  getFields = () => {
    if(this.state.data) {
      return  <div>
        Available entity models:
        {
          this.state.data.map((item, i) => {
            return <div key ={i} ><a href="true" onClick={(e) => this.handleClick(item, e)}>{item.name}</a><br /></div> 
          })
        }
        </div>
    }
  }

  handleClick = (item, e) => {
    e.preventDefault();
    this.props.setEntityModel(item);
  }

 render() {
    return   (this.getFields())
  }

 componentDidMount() {
    fetch(apiUrl.url.concat('getModelsByTypeId/'.concat(typesEnum.entity)))
    .then(res => res.json())
    .then(thisData => this.setState({data: thisData})); 
   
  }
}

export default EntitySidebar