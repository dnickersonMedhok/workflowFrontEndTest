import Home from './components/home/Home'
import EntityDesigner from './components/entityComponents/EntityDesigner'
import FormDesigner from './components/formComponents/FormDesigner'
import WorkflowDesigner from './components/workflowComponents/WorkflowDesigner'
import FormSidebar from './components/formComponents/formSidebar'
import EntitySidebar from './components/entityComponents/EntitySidebar'

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formJson: thisJson
    };

    this.setFormJson = this.setFormJson.bind(this);
    this.getFormJson = this.getFormJson.bind(this);

  }

  setFormJson(newFormJson){
    this.setState((state, props) => ({
      formJson: newFormJson
    }));
  }

  getFormJson() {
    return this.state.formJson;
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
      sidebar: () => <EntitySidebar />, 
      main: () => <EntityDesigner />
    },
    {
      path: "/formDesigner",
      sidebar: () => <FormSidebar setFormJson={this.setFormJson} getFormJson={this.getFormJson}/>,
      main: () => <FormDesigner setFormJson={this.setFormJson} getFormJson={this.getFormJson} />
    },
    {
      path: "/workflowDesigner",
      sidebar: () => <div>Workflow Designer stuff here</div>,
      main: () => <WorkflowDesigner />
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
