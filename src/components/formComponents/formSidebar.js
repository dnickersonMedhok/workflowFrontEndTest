import React, { Component } from 'react';

import Popup from "reactjs-popup";
import FormPreview from './formPreview';
import { apiUrl } from '../../resources/apiUrl';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import '../../css/App.css'
import { typesEnum } from '../../utilities/Constants'
import  FieldElement  from './fieldElement'


class FormSidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
            entities: [],
            data: [],
            formModels: [],
            formName: ""
        };
        this.handleEntityClick = this.handleEntityClick.bind(this);
        this.handleFormNameChange = this.handleFormNameChange.bind(this);
        this.handleFormNameSubmit = this.handleFormNameSubmit.bind(this);
      }

      handleFormNameChange(event) {
          this.setState({formName: event.target.value});
      }

      handleFormNameSubmit(event) {
        this.props.setFormName(this.state.formName);
        event.preventDefault();

    }

    // Get all associated fields for the
    // given entity that has been chosen (item)
    // and set in state 
    handleEntityClick(item, e) {
        let entityJson = JSON.parse(item.content);
        let fieldArray = entityJson.fields;
        let stateFieldArray = [];

        for (var i = 0; i < fieldArray.length; i++) {
            stateFieldArray.push(fieldArray[i].fieldName);
        }
        this.props.setEntityFields(stateFieldArray);
      }

 render() {
    return   (<div>
      <form  onSubmit={this.handleFormNameSubmit}>
        <label>
          Form name:
          <input type="text" value={this.state.formName} 
           onChange={this.handleFormNameChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>        
        {
            this.props.getEntityFields().map((item, thisKey) =>  { return <div><FieldElement key={thisKey} setFormJson={this.props.setFormJson} 
                getFormJson={this.props.getFormJson} getEntityFields={this.props.getEntityFields} setEntityFields={this.props.setEntityFields} 
                getSelectedFields={this.props.getSelectedFields} setSelectedFields={this.props.setSelectedFields} name={item} /><br /></div> })
        }

        <br />
        <br />
        <Dropdown className="myDropdown">      
          <DropdownTrigger> New </DropdownTrigger>
          <DropdownContent className="dropdown__content">
            <ul>
             {  
              this.state.entities.map((item, thisKey) => {
                 return <li><a href key={thisKey} onClick={(e) => this.handleEntityClick(item, e)}>{item.name}</a></li> 
             })
            } 
         </ul>
          </DropdownContent>
        </Dropdown>
        <br />
        <br />
              Available form models:
                 <ul>
                    {
                        this.state.data.map((item) => {
                        return <li key={item.id}>{item.name} </li>
                    })
                    }
                </ul>
        <Popup trigger={<button> preview</button>} position="bottom left">
            <FormPreview setFormJson={this.props.setFormJson} getFormJson={this.props.getFormJson}/>
        </Popup>
  </div>);
 }

 componentDidMount() {
    fetch(apiUrl.url.concat('getModelsByTypeId/2'))
    .then(res => res.json())
    .then(data => this.setState({data})); 

    fetch(apiUrl.url.concat('getModelsByTypeId/').concat(typesEnum.entity))
    .then(res => res.json())
    .then(theseEntities => this.setState({
      entities: theseEntities
    }));
   
  }
}

export default FormSidebar