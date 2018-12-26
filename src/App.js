import Home from './components/home/Home'
import EntityDesigner from './components/entityComponents/EntityDesigner'
import FormDesigner from './components/formComponents/FormDesigner'
import WorkflowDesigner from './components/workflowComponents/WorkflowDesigner'


import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { push as Menu } from 'react-burger-menu'
import Sidebar from './components/common/Sidebar';
import './css/App.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formJson: templateFormJson,
      entityModel: null,
      workflowModel: null,
      connections: null,
      nodes: null,
      //the fields shown on the sidebar
      entityFields: [],
      //the fields selected for the form
      selectedFields: []
    };

    this.setFormJson = this.setFormJson.bind(this);
    this.getFormJson = this.getFormJson.bind(this);
    this.setEntityFields = this.setEntityFields.bind(this);
    this.getEntityFields = this.getEntityFields.bind(this);
    this.setSelectedFields = this.setSelectedFields.bind(this);
    this.getSelectedFields = this.getSelectedFields.bind(this);
    this.setFormName = this.setFormName.bind(this);
    this.setEntityModel = this.setEntityModel.bind(this);
    this.getEntityModel = this.getEntityModel.bind(this);
    this.setWorkflowModel = this.setWorkflowModel.bind(this);
    this.getWorkflowModel = this.getWorkflowModel.bind(this);
    this.setNode = this.setNode.bind(this);
    this.getNode = this.getNode.bind(this);
    this.setConnections = this.setConnections(this);
  }

  setFormJson(newFormJson){
    this.setState((state, props) => ({
      nodes: newFormJson
    }));
  }

  getFormJson() {
    return this.state.formJson;
  }

  setEntityFields(entityFields){
    this.setState((state, props) => ({
      entityFields: entityFields
    }));
  }

  getEntityFields() {
    return this.state.entityFields;
  }

  setSelectedFields(newSelectedFields){
    this.setState((state, props) => ({
      selectedFields: newSelectedFields
    }));
  }

  getSelectedFields() {
    return this.state.selectedFields;
  }

  setFormName(newFormName) {
    let stateFormJson = this.state.formJson;
    let thisSubSection = stateFormJson.sections[0].subsections[0];
    thisSubSection.title = newFormName;
    stateFormJson.sections[0].subsections[0] = thisSubSection;
    this.setState(() => ({
      formJson: stateFormJson
    }))
  }

  setEntityModel(newEntityModel){
    this.setState((state, props) => ({
      entityModel: newEntityModel
    }));
  }

  getEntityModel() {
    return this.state.entityModel;
  }

  setWorkflowModel(newWorkflowModel){
    this.setState((state, props) => ({
      workflowModel: newWorkflowModel
    }));
  }

  getWorkflowModel() {
    return this.state.workflowModel;
  }

  setNode(newNode){
    let thisWorkflowModel = this.state.workflowModel;
    if(thisWorkflowModel) {
      let dagModel = JSON.parse(thisWorkflowModel.content);
      dagModel['nodes'].push(newNode);
      thisWorkflowModel.content = JSON.stringify(dagModel);
    } else {
      thisWorkflowModel = {
        modelTypeId: 3,
        content: JSON.stringify({
          connections: [],
          nodes: [newNode]
        })
      };
    }
    this.setState({workflowModel: thisWorkflowModel});
  }

  setConnections(connections) {
    let thisWorkflowModel = this.state.workflowModel;
    if(thisWorkflowModel) {
      let dagModel = JSON.parse(thisWorkflowModel.content);
      dagModel.connections = connections;
      thisWorkflowModel.content = JSON.stringify(dagModel);
    } else {
      thisWorkflowModel = {
        modelTypeId: 3,
        content: JSON.stringify({
          connections: connections,
          nodes: []
        })
      };
    }
    this.setState({workflowModel: thisWorkflowModel});


  }

  getNode(){
      return this.state.nodes
  }


render() {

  const routes = [
    {
      path: "/",
      exact: true,
      main: () => <Home />
    },
    {
      path: "/entityDesigner",
      main: () => <EntityDesigner setEntityModel={this.setEntityModel} getEntityModel={this.getEntityModel} />
    },
    {
      path: "/formDesigner",
      main: () => <FormDesigner setFormJson={this.setFormJson} getFormJson={this.getFormJson} 
      getEntityFields={this.getEntityFields} setEntityFields={this.setEntityFields} 
      getSelectedFields={this.getSelectedFields} setSelectedFields={this.setSelectedFields} />
    },
    {
      path: "/workflowDesigner",
      main: () => <WorkflowDesigner setWorkflowModel={this.setWorkflowModel} getWorkflowModel={this.getWorkflowModel}
        getNode={this.getNode} setConnections={this.setConnections}/>
    }
  ];
  return (
    <Router>
      <div id="outer-container">
        <Menu width={ '15%' } isOpen={ true } noOverlay class="bm-menu" pageWrapId={ "page-wrap" }>

          <Sidebar  key="key"  setEntityModel={this.setEntityModel} getEntityModel={this.getEntityModel} 
                setFormJson={this.setFormJson} getFormJson={this.getFormJson} setWorkflowModel={this.setWorkflowModel} 
                getWorkflowModel={this.getWorkflowModel} getNode={this.getNode} setNode={this.setNode} 
                getEntityFields={this.getEntityFields} setEntityFields={this.setEntityFields} 
                getSelectedFields={this.getSelectedFields} setSelectedFields={this.setSelectedFields}
                setFormName={this.setFormName} />
        </Menu>
        <div id="page-wrap" style={{ flex: 1, padding: "10px" }}>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.main}
            />
          ))}
        </div>
      </div>
    </Router>
  );
}
}


const templateFormJson =         {
  id: "login_form",
  title: "Welcome to Foo!",
  sections: [
    {
      id: "section_1",
      title: "Login Section",
      subsections: [
        {
          id: "subsection_1",
          title: "",
          fields: []
        }
      ]
    }
  ]       
};


//hard coded form model for now
// const thisJson =         {
//   id: "login_form",
//   title: "Welcome to Foo!",
//   sections: [
//     {
//       id: "section_1",
//       title: "Login Section",
//       subsections: [
//         {
//           id: "subsection_1",
//           title: "Test form",
//           subtitle: "This is just a test form.",
//           fields: [
//             {
//               id: "user_name",
//               title: "field 1",
//               type: "string"
//             },
//             {
//               id: "user_pass",
//               title: "field 2",
//               type: "string"
//             },
//             {
//               id: "remember_me",
//               title: "just some random checkbox",
//               type: "boolean"
//             },
//           {
//             "id": "bool3",
//             "type": "boolean",
//             "title": "just some random radio buttons",
//             "inline": false,
//             "options": [
//               {
//                 "title": "Yes"
//               },
//               {
//                 "title": "No"
//               }
//             ]
//           }
//           ]
//         }
//       ]
//     }
//   ],
//   decorators: {
//     "user_pass": {
//       component: {
//         type: "password"
//       }
//     }
//   }        
// };

export default App;
