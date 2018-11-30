import React, { Component } from 'react';
import { apiUrl } from '../../resources/apiUrl';
import { buttonStyles, nodeType1Styles, nodeType2Styles, nodeType3Styles} from "./dagComponents/dagUtils"

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
      onClick={this.addNode.bind(null, "transform")}
    >
      Add Node Type 1
    </button><br />
    <button
      className={`${buttonStyles} ${nodeType2Styles}`}
      onClick={this.addNode.bind(null, "action")}
    >
      Add Node Type 2
    </button><br />
    <button
      className={`${buttonStyles} ${nodeType3Styles}`}
      onClick={this.addNode.bind(null, "condition")}
    >
      Add Node Type 3
    </button>
    <button
      className={`${buttonStyles}`}
      onClick={this.addNode.bind(null, "source")}
    >
      Add Node Type 4
    </button>
    <button
      className={`${buttonStyles} ${nodeType1Styles}`}
      onClick={this.addNode.bind(null, "sink")}
    >
      Add Node Type 5
    </button><br /> 
        Available workflow models:
        {
            this.state.data.map((item, key) => {
                return <div><a href="true" key={key} onClick={(e) => this.handleClick(item, e)}>{item.name}</a><br /></div> 
            })
        }
            </div></center> );
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