import Home from './components/home/Home'
import EntityDesigner from './components/entityComponents/EntityDesigner'
import FormDesigner from './components/formComponents/FormDesigner'
import WorkflowDesigner from './components/workflowComponents/WorkflowDesigner'
import FormSidebar from './components/formComponents/formSidebar'
import EntitySidebar from './components/entityComponents/EntitySidebar'
import WorkflowSidebar from './components/workflowComponents/workflowSidebar'
//TODO this will have to be created dynamically
import { data } from "./components/workflowComponents/dagComponents/data";

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formJson: thisJson,
      entityModel: null,
      workflowModel: null,
      connections: data.connections,
      nodes: data.nodes,
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
      sidebar: () => <div></div>,
      main: () => <Home />
    },
    {
      path: "/entityDesigner",
      sidebar: () => <EntitySidebar setEntityModel={this.setEntityModel} getEntityModel={this.getEntityModel}/>, 
      main: () => <EntityDesigner setEntityModel={this.setEntityModel} getEntityModel={this.getEntityModel} />
    },
    {
      path: "/formDesigner",
      sidebar: () => <FormSidebar setFormJson={this.setFormJson} getFormJson={this.getFormJson}/>,
      main: () => <FormDesigner setFormJson={this.setFormJson} getFormJson={this.getFormJson} />
    },
    {
      path: "/workflowDesigner",
      sidebar: () => <WorkflowSidebar setWorkflowJson={this.setWorkflowJson} getWorkflowJson={this.getWorkflowJson}
        setNode={this.setNode } getNode={this.getNode}/>,
      main: () => <WorkflowDesigner setWorkflowJson={this.setWorkflowJson} getWorkflowJson={this.getWorkflowJson}
        getNode={this.getNode}/>
    }
  ];
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <div
          style={{
            padding: "10px",
            width: "15%",
            background: "#f0f0f0"
          }}
        >
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/entityDesigner">EntityDesigner</Link>
            </li>
            <li>
              <Link to="/formDesigner">FormDesigner</Link>
            </li>
            <li>
              <Link to="/workflowDesigner">WorkflowDesigner</Link>
            </li>
          </ul>

          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              component={route.sidebar}
            />
          ))}
        </div>

        <div style={{ flex: 1, padding: "10px" }}>
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
