import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import FormSidebar from '../formComponents/formSidebar'
import EntitySidebar from '../entityComponents/EntitySidebar'
import WorkflowSidebar from '../workflowComponents/workflowSidebar'

class Sidebar extends Component {
  showSettings (event) {
    event.preventDefault();
  }

  render() { 

  const routes = [
    {
      path: "/",
      exact: true,
      sidebar: () => <div></div>,
    },
    {
      path: "/entityDesigner",
      sidebar: () => <EntitySidebar setEntityModel={this.props.setEntityModel} getEntityModel={this.props.getEntityModel}/>
    },
    {
      path: "/formDesigner",
      sidebar: () => <FormSidebar setFormJson={this.props.setFormJson} getFormJson={this.props.getFormJson}
      getEntityFields={this.props.getEntityFields} setEntityFields={this.props.setEntityFields} 
      getSelectedFields={this.props.getSelectedFields} setSelectedFields={this.props.setSelectedFields}/>
    },
    {
      path: "/workflowDesigner",
      sidebar: () => <WorkflowSidebar setWorkflowModel={this.props.setWorkflowModel} getWorkflowModel={this.props.getWorkflowModel}
        setNode={this.props.setNode } getNode={this.props.getNode}/>
    }
  ];

    return (<div>
      
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
      </div>);
  }
}

      export default Sidebar;
