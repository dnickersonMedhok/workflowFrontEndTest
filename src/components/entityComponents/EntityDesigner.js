import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EntityDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      inputs: [],
      fields: [],
      entityName: "",
      id: null
    };

    this.appendInput = this.appendInput.bind(this);
    this.save = this.save.bind(this);
    this.handleEntityNameChange = this.handleEntityNameChange.bind(this);
    this.handleFieldNameChange = this.handleFieldNameChange.bind(this);
    this.setEntity = this.setEntity.bind(this);

  }

  setEntity() {
    let entityModel = this.props.getEntityModel();
    if(entityModel === null) {
      return "";
    }
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

  componentWillMount() {
    this.setEntity();
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

             { this.state.fields.map((item, key) => { return <FormControl className="form-control" type={ item.fieldType } name={item.fieldName} 
             value={ item.fieldValue } key={key} 
              onChange={this.handleFieldNameChange}/>;
            })} 



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
      fieldType:"text"
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
    var fieldsObj = {
      entityName: this.state.entityName,
      parentTable: "",
      fields: []
    }

    var i;

    for(i=0; i<this.state.fields.length; i++) {

      var newField = {
        //backend understands the value of the field as the field name
        fieldName: this.state.fields[i].fieldValue,
        fieldType: "text",
      }
      fieldsObj.fields[i] = newField;
    }

    var jsonObj = {
      "id": this.state.id,
      "orgId": 1,
      "modelTypeId": 1,
      "name": this.state.entityName
    }

    jsonObj["content"] = JSON.stringify(fieldsObj);
  
    fetch(apiUrl.url.concat('saveModel'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObj)
    });
    this.setState((state, props) => (    {
      data: [],
      inputs: [],
      fields: [],
      entityName: ""
    }));
   // this.componentDidMount();


  }
}

export default EntityDesigner
