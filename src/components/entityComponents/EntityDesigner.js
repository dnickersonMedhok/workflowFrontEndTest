import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { Button, Form, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';

class EntityDesigner extends Component { 
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      inputs: ['input-0']
    };
  }

  render() {
    return (<div className="App" class="form-group">
      <h5><b>The Entity Designer</b></h5> 
      Available entity models:
      <ul>
        {
          this.state.data.map((item, key) => {
            return <li key={key}>{item.name} </li>
          })
        }
      </ul>
      <hr/>
      <center>
      <Form class="form-inline">
        <FormGroup controlId="formBasicText">
          <ControlLabel>New entity: Add fields</ControlLabel>
          {this.state.inputs.map((item, key) => {
            return <FormControl class="form-control" type="text" name={item} key={key}/>;
            })}
               <Button onClick={ () => this.appendInput() }>
                   Add Field
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
    var newInput = `input-${this.state.inputs.length}`;
    this.setState({ inputs: this.state.inputs.concat([newInput]) });
}
}

export default EntityDesigner
