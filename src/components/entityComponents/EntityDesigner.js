import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
//import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import Select from 'react-select'


class EntityDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      inputs: [],
      fields: [],
      entityName: "",
      id: null,
      fieldTypeSelected: []
    };

    this.appendInput = this.appendInput.bind(this);
    this.save = this.save.bind(this);
    this.handleEntityNameChange = this.handleEntityNameChange.bind(this);
    this.handleFieldNameChange = this.handleFieldNameChange.bind(this);
    this.setEntity = this.setEntity.bind(this);
    this.getFieldsField = this.getFieldsField.bind(this);
//    this.handleFieldClick= this.handleFieldClick.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.getDefaultOption = this.getDefaultOption.bind(this);
  }

  handleSelectChange(selectedOption) {
    console.log(selectedOption)
    var thisFieldName = selectedOption.value;
    var thisFieldType = selectedOption.label;
    if(thisFieldName && thisFieldType) {
      let thisEntityModel = this.props.getEntityModel();
      if(thisEntityModel) {
        let thisContent = thisEntityModel.content;
        let thisEntity = JSON.parse(thisContent);
        var found = false;
        for(var i = 0; i < thisEntity.fields.length && !found; i++) {
          if(thisFieldName === thisEntity.fields[i].fieldName) {
            thisEntity.fields[i].fieldType = thisFieldType
            let clonedFieldTypeSelected = this.state.fieldTypeSelected;
            clonedFieldTypeSelected[i] = selectedOption;
            this.setState({fieldTypeSelected: clonedFieldTypeSelected})
            found = true;
            console.log("found in entity model")
          }
        }
        if(found) {
          thisEntityModel.content = JSON.stringify(thisEntity);
          this.props.setEntityModel(thisEntityModel);
        }
      } 

      var clonedFields = this.state.fields;
      found = false;
      if(clonedFields) {
        for(var j = 0; j < clonedFields.length && !found; j++) {
          if(thisFieldName === clonedFields[j].fieldValue) {
            clonedFields[j].fieldType = thisFieldType;
            found = true;
            console.log("found in state.fields")
          }
        }
        if(found) {
          this.setState({fields: clonedFields});
        }
      } 
    }
  }

  setEntity() {
    let entityModel = this.props.getEntityModel();
    if(entityModel === null) {
      return "";
    }
    if(entityModel.content) {
      let content = JSON.parse(entityModel.content)
      const theseInputs = [];
      const theseFields = [];
      for(var i = 0; i < content.fields.length; i++) {
        var newInput = `field${this.state.inputs.length + 1}`;
        theseInputs.push(newInput);
        var thisField = {
          fieldName: newInput,
          fieldValue:  content.fields[i].fieldName ,
          fieldType: content.fields[i].fieldType
        }
        theseFields.push(thisField);
      }
      this.setState({ id: entityModel.id });
      this.setState({entityName: entityModel.name});
      this.setState({ inputs: theseInputs });
      this.setState({fields: theseFields});
    }
  }

  componentWillMount() {
    this.setEntity();
  }

  getDefaultOption(theseOptions, fieldType) {
    let found = false;
    var returnOption = null;
    for(var j = 0; j < theseOptions.length && !found; j++) {
      if(theseOptions[j].label === fieldType) {
        returnOption = theseOptions[j];
        found = true;
      }
    }
    return returnOption
  }

  getFieldsField() {
    var theseFields = [];

    for(var i = 0; i < this.state.fields.length; i++) {
      const theseOptions = [
        { label: 'text', value: this.state.fields[i].fieldValue },
        { label: 'boolean', value: this.state.fields[i].fieldValue }
      ];

      let defaultOption = this.getDefaultOption(theseOptions, this.state.fields[i].fieldType);

     theseFields[i] = <div className="form-inline">Field Name: <FormControl className="form-control" type={ this.state.fields[i].fieldType } name={this.state.fields[i].fieldName} 
             value={ this.state.fields[i].fieldValue } key={i} id={i}
              onChange={this.handleFieldNameChange}/>

      <Select className="myDropdown" options={theseOptions} onChange={this.handleSelectChange} placeholder="type" 
      defaultValue={defaultOption}/>
            </div>      
    }

    return theseFields;
  }

  render() {


    return (<div className="App" >
      <center><h5><b>The Entity Designer</b></h5> 
      <Form horizontal onSubmit={this.handleSubmit}>
        <FormGroup> 
          <ControlLabel><b>New entity</b></ControlLabel><br/>
          <ControlLabel>Entity name</ControlLabel>
          <FormControl className="form-control" type="text" name="entityName" id="entityName" value={ this.state.entityName } onChange={this.handleEntityNameChange}  />
          <br/><br/>

            { this.getFieldsField() }

            <br /><br />
               <Button onClick={ () => this.appendInput() }>
                   Add Field
               </Button>
               <Button onClick={ () => this.save() }>
                   Save
               </Button>        
               </FormGroup>
      </Form>
      </center>
          
      </div>);
  }

  appendInput() {
    var newInput = `field${this.state.inputs.length + 1}`;
    var thisField = {
      fieldName: newInput,
      fieldValue: "",
      fieldType:""
    }
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
    this.setState({fields: this.state.fields.concat(thisField)});
  }

  handleEntityNameChange(event) {
    this.setState({entityName: event.target.value});
  }

  handleFieldNameChange(event) {
    var cloneFields = JSON.parse(JSON.stringify(this.state)).fields
    for (var i in cloneFields) {
      if (cloneFields[i].fieldName === event.target.name) {
        cloneFields[i].fieldValue = event.target.value;
         break; 
      }
    }
    this.setState({fields: cloneFields});

  }

  save() {

    var entityModel = this.props.getEntityModel();

    if(entityModel) {
      this.saveEntityModel(entityModel);
    } else {
      var fieldsObj = {
        entityName: this.state.entityName,
        parentTable: "",
        fields: []
      }

      for(var i=0; i<this.state.fields.length; i++) {
        var newField = {
          //backend understands the value of the field as the field name
          fieldName: this.state.fields[i].fieldValue,
          fieldType: this.state.fields[i].fieldType,
        }
        fieldsObj.fields[i] = newField;
      }

      var jsonObj = {
        "orgId": 1,
        "modelTypeId": 1,
        "name": this.state.entityName
      }

      jsonObj["content"] = JSON.stringify(fieldsObj);
  
      this.saveEntityModel(jsonObj);
      this.setState((state, props) => (    {
        data: [],
        inputs: [],
        fields: [],
        entityName: ""
      }));
    }
  }

  saveEntityModel(entityModel) {
    fetch(apiUrl.url.concat('saveModel'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entityModel)
    });
  }
}

export default EntityDesigner
