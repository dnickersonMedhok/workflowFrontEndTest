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
      formJson: thisJson,
      entityModel: null,
      workflowModel: null,
      connections: null,
      nodes: null,
    };

    this.setFormJson = this.setFormJson.bind(this);
    this.getFormJson = this.getFormJson.bind(this);
    this.setEntityModel = this.setEntityModel.bind(this);
    this.getEntityModel = this.getEntityModel.bind(this);
    this.setWorkflowModel = this.setWorkflowModel.bind(this);
    this.getWorkflowModel = this.getWorkflowModel.bind(this);
    this.setNode = this.setNode.bind(this);
    this.getNode = this.getNode.bind(this);
  }

  setFormJson(newFormJson){
    this.setState((state, props) => ({
      nodes: newFormJson
    }));
  }

  getFormJson() {
    return this.state.formJson;
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
    this.setState(() => ({
      nodes: [...this.state.nodes, newNode],

    }));
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
      main: () => <FormDesigner setFormJson={this.setFormJson} getFormJson={this.getFormJson} />
    },
    {
      path: "/workflowDesigner",
      main: () => <WorkflowDesigner setWorkflowModel={this.setWorkflowModel} getWorkflowModel={this.getWorkflowModel}
        getNode={this.getNode}/>
    }
  ];
  return (
    <Router>
      <div id="outer-container">
        <Menu width={ '15%' } isOpen={ true } noOverlay class="bm-menu" pageWrapId={ "page-wrap" }>

          <Sidebar   setEntityModel={this.setEntityModel} getEntityModel={this.getEntityModel} 
                setFormJson={this.setFormJson} getFormJson={this.getFormJson} setWorkflowModel={this.setWorkflowModel} 
                getWorkflowModel={this.getWorkflowModel} getNode={this.getNode} setNode={this.setNode}  />
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

//hard coded form model for now
const thisJson =         {
  id: "login_form",
  title: "Welcome to Foo!",
  sections: [
    {
      id: "section_1",
      title: "Login Section",
      subsections: [
        {
          id: "subsection_1",
          title: "Test form",
          subtitle: "This is just a test form.",
          fields: [
            {
              id: "user_name",
              title: "field 1",
              type: "string"
            },
            {
              id: "user_pass",
              title: "field 2",
              type: "string"
            },
            {
              id: "remember_me",
              title: "just some random checkbox",
              type: "boolean"
            },
          {
            "id": "bool3",
            "type": "boolean",
            "title": "just some random radio buttons",
            "inline": false,
            "options": [
              {
                "title": "Yes"
              },
              {
                "title": "No"
              }
            ]
          }
          ]
        }
      ]
    }
  ],
  decorators: {
    "user_pass": {
      component: {
        type: "password"
      }
    }
  }        
};

export default App;
