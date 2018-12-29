import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { typesEnum } from '../../utilities/Constants'
import Select from 'react-select'

class EntitySidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []        
        };
        this.getFields = this.getFields.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
      }

  getFields = () => {
    if(this.state.data) {

      const theseOptions = [];

      for(var i = 0;i < this.state.data.length; i++) {
        var thisOption = {
          value: this.state.data[i].name,
          label: this.state.data[i].name
        }
        theseOptions.push(thisOption);
      }

      return  <div>
        <Select options={theseOptions}  onChange={this.handleSelectChange} placeholder="edit"/>
        </div>
    }
  }

  handleSelectChange = (selectedOption) => {
    let found = false;
    var entityModel;
    for(var i = 0;i < this.state.data.length && !found; i++) {
        if(this.state.data[i].name === selectedOption.label) {
          found = true;
          entityModel = this.state.data[i]
        }      
    }
    if(found) {
      this.props.setEntityModel(entityModel);
    }  
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