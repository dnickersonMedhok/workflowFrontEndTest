import React, { Component } from 'react';

import Select from 'react-select'
import { apiUrl } from '../../resources/apiUrl';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import '../../css/App.css'
import { typesEnum } from '../../utilities/Constants'
import  FieldElementButton  from './fieldElementButton'


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
        this.getAvailableFormModels = this.getAvailableFormModels.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
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
    handleEntityClick(item) {
        let entityJson = JSON.parse(item.content);
        let fieldArray = entityJson.fields;
        let stateFieldArray = [];

        for (var i = 0; i < fieldArray.length; i++) {
            let fieldObj = {
                fieldName: fieldArray[i].fieldName,
                fieldType: fieldArray[i].fieldType
            }
            stateFieldArray.push(fieldObj);
        }
        this.props.setEntityFields(stateFieldArray);
      }

      //Handle the selection of an existing from
      //from the edit button
    handleFormChange = (selectedOption) => {
        console.log(selectedOption)
        let found = false;
        var formModel;
        for(var i = 0;i < this.state.data.length && !found; i++) {
            if(this.state.data[i].name === selectedOption.label) {
              found = true;
              formModel = this.state.data[i]
            }      
        }
        if(found) {
            console.log(formModel)
            let formName = formModel.name;
            if(formName) {
                console.log(formModel.name)
                this.props.setFormName(formModel.name);
            }
            let formContent = JSON.parse(formModel.content);
            if(formContent) {
                this.props.setFormJson(formContent);
                let entityId = formModel.referenceEntityId;
                if(entityId) {
                    let found = false;
                    for(var j = 0; j < this.state.entities.length && !found; j++) {
                        if(entityId === this.state.entities[j].id) {
                            found = true;
                            let entityJson = JSON.parse(this.state.entities[j].content);
                            let fieldArray = entityJson.fields;
                            let stateFieldArray = [];
                
                            for (var h = 0; h < fieldArray.length; h++) {
                                let fieldObj = {
                                    fieldName: fieldArray[h].fieldName,
                                    fieldType: fieldArray[h].fieldType
                                }
                                stateFieldArray.push(fieldObj);
                            }
                            this.props.setEntityFields(stateFieldArray);
                        }
                    }
                }
            }
        }
    } 

      getAvailableFormModels = () => {
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
            <Select options={theseOptions}  onChange={this.handleFormChange} placeholder="edit"/>
            </div>
        }
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
            this.props.getEntityFields().map((item, thisKey) =>  { return <div><FieldElementButton key={thisKey} setFormJson={this.props.setFormJson} 
                getFormJson={this.props.getFormJson} getEntityFields={this.props.getEntityFields} setEntityFields={this.props.setEntityFields} 
                getSelectedFields={this.props.getSelectedFields} setSelectedFields={this.props.setSelectedFields} name={item.fieldName} 
                type={item.fieldType}/><br /></div> })
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

        { this.getAvailableFormModels() }

        </div>);
 }

 componentDidMount() {
    fetch(apiUrl.url.concat('getModelsByTypeId/').concat(typesEnum.form))
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