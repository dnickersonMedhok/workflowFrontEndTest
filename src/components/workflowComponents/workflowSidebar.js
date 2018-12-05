import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { buttonStyles, nodeType1Styles, nodeType2Styles } from "./dagComponents/dagUtils"
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Button } from 'react-bootstrap';
import '../../css/App.css'


/* tslint:disable */
const uuidv4 = require("uuid/v4");
/* tslint:enable */

class WorkflowSidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: []
                };
        this.handleClick = this.handleClick.bind(this);
        this.save = this.save.bind(this);
      }

      save() {
        let thisWorkflowModel = this.props.getWorkflowModel();
        if(thisWorkflowModel) {
          fetch(apiUrl.url.concat('saveModel'), {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(thisWorkflowModel)
          });
        }
      }


      addNode = (type) => {
        const generateNodeConfig = (t) => ({
          config: {
            label: `Node Type: ${type} #${Math.ceil(Math.random() * 100)}`,
            type: t,
          },
          id: uuidv4(),
        });
        this.props.setNode(generateNodeConfig(type));
      };
 
 render() {
    return   (    <center><div key="button-panel">
    <button
      className={`${buttonStyles} ${nodeType1Styles}`}
      onClick={this.addNode.bind(null, "action")}
    >
      Add a step
    </button><br />
    <button
      className={`${buttonStyles} ${nodeType2Styles}`}
      onClick={this.addNode.bind(null, "condition")}
    >
      Add a condition
    </button><br />
    <br />
        <Dropdown className="myDropdown">      
          <DropdownTrigger>Edit workflow model </DropdownTrigger>
          <DropdownContent classNae="dropdown__content">
            <ul>
             {  
              this.state.data.map((item, key) => {
                 return <li><a href="true" key={key} onClick={(e) => this.handleClick(item, e)}>{item.name}</a></li> 
             })
            } 
         </ul>
          </DropdownContent>
        </Dropdown>
        <Button onClick={ () => this.save() }>
          Save
        </Button>


            </div>
            </center> );
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