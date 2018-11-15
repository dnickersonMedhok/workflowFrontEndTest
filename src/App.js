import Home from './components/home/Home'
import EntityDesigner from './components/entityComponents/EntityDesigner'
import FormDesigner from './components/formComponents/FormDesigner'
import WorkflowDesigner from './components/workflowComponents/WorkflowDesigner'

import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const routes = [
  {
    path: "/",
    exact: true,
    sidebar: () => <div></div>,
    main: () => <Home />
  },
  {
    path: "/entityDesigner",
    sidebar: () => <div>entity designer stuff here</div>, //TODO: create components for each type for the sidebar
    main: () => <EntityDesigner />
  },
  {
    path: "/formDesigner",
    sidebar: () => <div>Form Designer stuff here</div>,
    main: () => <FormDesigner />
  },
  {
    path: "/workflowDesigner",
    sidebar: () => <div>Workflow Designer stuff here</div>,
    main: () => <WorkflowDesigner />
  }
];

function App() {
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

export default App;
