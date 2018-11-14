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
      entityName: ""
    };

    this.appendInput = this.appendInput.bind(this);
    this.save = this.save.bind(this);
    this.handleEntityNameChange = this.handleEntityNameChange.bind(this);
    this.handleFieldNameChange = this.handleFieldNameChange.bind(this);

  }

  render() {
    return (<div className="App" >
      <center><h5><b>The Entity Designer</b></h5> 
      Available entity models:
      <ul>
        {
          this.state.data.map((item, key) => {
            return <li key={key}>{item.name} </li>
          })
        }
      </ul>
      <hr/>
      <Form class="form-inline" onSubmit={this.handleSubmit}>
        <FormGroup controlId="formBasicText">
          <ControlLabel><b>New entity</b></ControlLabel><br/>
          <ControlLabel>Entity name</ControlLabel>
          <FormControl className="form-control" type="text" name="entityName" value={this.state.entityName} onChange={this.handleEntityNameChange}  />
          <br/><br/>
          {this.state.inputs.map((item, key) => {
            return <FormControl className="form-control" type="text" name={item} key={key} onChange={this.handleFieldNameChange}/>;
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

  componentDidMount() {
    fetch(apiUrl.url.concat('getModelsByTypeId/1'))
    .then(res => res.json())
    .then(data => this.setState({data}));
  }

  appendInput() {
    var newInput = `field${this.state.inputs.length + 1}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
  }

  handleEntityNameChange(event) {
    this.setState({entityName: event.target.value});
  }

  handleFieldNameChange(event) {
    var thisField = {
      fieldName: event.target.value,
      fieldType: "text"
    }
    this.setState({fields: this.state.fields.concat(thisField)});
  }

  save() {
    var fieldsObj = {
      entityName: this.state.entityName,
      table: "GENERIC_TABLE_1",
      parentTable: "",
      fields: []
    }

    var i;

    for(i=0; i<this.state.fields.length; i++) {

      var newField = {
        fieldName: this.state.fields[i].fieldName,
        fieldType: "text",
        column: "varchar_45_1"
      }
      fieldsObj.fields[i] = newField;
    }

    var jsonObj = {
      "orgId": 1,
      "modelTypeId": 1,
      "name": this.state.entityName
    }

    jsonObj["content"] = JSON.stringify(fieldsObj);
    console.log(jsonObj);
  
    fetch(apiUrl.url.concat('saveModel'), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObj)
    });
    this.componentDidMount();
    this.setState({ state: this.state });
  }
}

export default EntityDesigner
