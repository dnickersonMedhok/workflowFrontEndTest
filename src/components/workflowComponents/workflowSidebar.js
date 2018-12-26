import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { buttonStyles, nodeType1Styles, nodeType2Styles } from "./dagComponents/dagUtils"
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import { Button } from 'react-bootstrap';
import '../../css/App.css'
import { typesEnum } from '../../utilities/Constants'


/* tslint:disable */
const uuidv4 = require("uuid/v4");
/* tslint:enable */

class WorkflowSidebar extends Component  {
 
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          entities: [],
          highestStepId: 0,
          formModels: []
        };
        this.handleClick = this.handleClick.bind(this);
        this.save = this.save.bind(this);
        this.handleEntityClick = this.handleEntityClick.bind(this);
        this.addNode = this.addNode.bind(this);
        this.getAddCondition = this.getAddCondition.bind(this);
      }

      // Get all associated form models for the
      // given entity that has been chosen (item) 
      handleEntityClick(item, e) {
        fetch(apiUrl.url.concat('getFormModelsByEntityId/').concat(item.id))
        .then(res => res.json())
        .then(theseFormModels => this.setState({
          formModels: theseFormModels
        }));
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

      getAddCondition() {
        if(this.state.formModels.length > 0) {
          return     <button
          className={`${buttonStyles} ${nodeType2Styles}`}
          onClick={this.addNode.bind(null, "condition")}
        >
          Add a condition
        </button>
        } 
          return <div></div>
        
      }

      addNode = (type, formName) => {
        console.log("state.hightestStepId ".concat(this.state.highestStepId))
        const generateNodeConfig = (t, thisLabel) => ({
          config: {
            label: thisLabel,
            type: t,
          },
          id: uuidv4(),
        });
        if(type.localeCompare("condition") !== 0) {
          let label = `Step ${this.state.highestStepId + 1} ${formName}`;
          this.props.setNode(generateNodeConfig(type, label));
          this.setState({ highestStepId: this.state.highestStepId + 1 });
        } else {
          this.props.setNode(generateNodeConfig(type, "conditional logic"))
        }
      };
 
 render() {
    return   (    <center><div key="button-panel">

  { this.state.formModels.map((item, key) => { 
      return     <button
        className={`${buttonStyles} ${nodeType1Styles}`} key={key}
        onClick={this.addNode.bind(null, "action", item.name)}> {item.name}
        </button>
      })
  }
  <br />

    
    { this.getAddCondition() }
    


        <Dropdown className="myDropdown">      
          <DropdownTrigger> New </DropdownTrigger>
          <DropdownContent className="dropdown__content">
            <ul>
             {  
              this.state.entities.map((item, key) => {
                 return <li><a href key={key} onClick={(e) => this.handleEntityClick(item, e)}>{item.name}</a></li> 
             })
            } 
         </ul>
          </DropdownContent>
        </Dropdown>
            <br />
            <br />
            <br />
            <br />
            <br />

        <Dropdown className="myDropdown">      
          <DropdownTrigger> Edit </DropdownTrigger>
          <DropdownContent className="dropdown__content">
            <ul>
             {  
              this.state.data.map((item, key) => {
                 return <li><a href key={key} onClick={(e) => this.handleClick(item, e)}>{item.name}</a></li> 
             })
            } 
         </ul>
          </DropdownContent>
        </Dropdown>
        <br /><br />
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
    if(this.state.data.length === 0) {
      console.log("fetching")
   fetch(apiUrl.url.concat('getModelsByTypeId/').concat(typesEnum.workflow))
     .then(res => res.json())
     .then(thisData => this.setState({
       data: thisData
     }));

   fetch(apiUrl.url.concat('getModelsByTypeId/').concat(typesEnum.entity))
     .then(res => res.json())
     .then(theseEntities => this.setState({
       entities: theseEntities
     }));
    }

  }
 }

export default WorkflowSidebar