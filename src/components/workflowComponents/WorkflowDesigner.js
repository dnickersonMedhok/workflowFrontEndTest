import * as React from "react";
import ReactDAG, {DefaultNode} from "react-dag";
import StepNode from "./dagComponents/StepNode";
import ConditionNode from "./dagComponents/ConditionNode";

import {
  conditionConnectionDecoder,
  conditionConnectionEncoder,
  transformConnectionDecoder,
  transformConnectionEncoder,
} from "./dagComponents/connectionReducers";
import {
  defaultSettings,
  dottedConnectionStyle,
  selectedConnectionStyle,
} from "../../resources/dag-settings";
import { onConnectionEventHandler, onEndPointClick } from "./dagComponents/eventHandlers";
import { connect } from "react-redux";

import dagre from "dagre";
import { data } from "./dagComponents/data";
import { buttonStyles, buttonPanelStyles, dagWrapperStyles, headerStyles } from "./dagComponents/dagUtils"

/* tslint:disable */
const cloneDeep = require("lodash.clonedeep");
/* tslint: enable */

const registerTypes = {
  connections: {
    dotted: dottedConnectionStyle,
    selected: selectedConnectionStyle,
  },
  endpoints: {},
};
const eventListeners = {
  click: onEndPointClick,
  connection: onConnectionEventHandler,
  endpointClick: onEndPointClick,
};

const typeToComponentMap = {
  action: StepNode,
  condition: ConditionNode,
  sink: StepNode,
  source: DefaultNode,
  transform: StepNode,
};

const getComponent = (type) =>
  typeToComponentMap[type] ? typeToComponentMap[type] : DefaultNode;
const getLayout = (nodes, connections, separation = 200) => {
  const graph = new dagre.graphlib.Graph();
  graph.setGraph({
    marginx: 0,
    marginy: 0,
    nodesep: 90,
    rankdir: "LR",
    ranker: "longest-path",
    ranksep: separation,
  });
  graph.setDefaultEdgeLabel(() => ({}));

  nodes.forEach(node => {
    const id = node.id;
    graph.setNode(id, { label: node.config ? node.config.label : "", width: 100, height: 100 });
  });

  connections.forEach(connection => {
    graph.setEdge(connection.sourceId, connection.targetId);
  });

  dagre.layout(graph);
  return graph;
};
const graphNodes = getLayout(data.nodes, data.connections);
data.nodes = data.nodes.map(node => {
  const location = graphNodes._nodes[node.id];
  return {
    ...node,
    config: {
      ...node.config,
      style: {
        left: `${location.x}px`,
        top: `${location.y}px`,
      },
    },
  };
});
class WorkflowDesigner extends React.Component {
  state = {
    connections: data.connections,
    nodes: data.nodes,
    zoom: .75,
  };

  setZoom = (zoomIn) => {
    if (zoomIn) {
      this.setState({ zoom: this.state.zoom + 0.2 });
    } else {
      this.setState({ zoom: this.state.zoom - 0.2 });
    }
  };
  render() {
    let nodesFromState = this.props.getNode();
    return [
      <h1 className={`${headerStyles}`} key="title">
        Workflow Designer
      </h1>,
      <div className={`${buttonPanelStyles}`} key="button-panel">
        <button
          className={`${buttonStyles}`}
          onClick={this.setZoom.bind(this, true)}
        >
          Zoom in
        </button>
        <button
          className={`${buttonStyles}`}
          onClick={this.setZoom.bind(this, false)}
        >
          Zoom out
        </button>
      </div>,
            <div className="workflow-rightBar">
            workflow sidebar <br />
                  currentNodeId: { this.props.currentNodeId.nodeId } 

        </div>,
      <ReactDAG
        className={`${dagWrapperStyles}`}
        key="dag"
        connections={cloneDeep(this.state.connections)}
        nodes={cloneDeep(nodesFromState)}
        jsPlumbSettings={defaultSettings}
        connectionDecoders={[
          transformConnectionDecoder,
          conditionConnectionDecoder,
        ]}
        connectionEncoders={[
          transformConnectionEncoder,
          conditionConnectionEncoder,
        ]}
        eventListeners={eventListeners}
        registerTypes={registerTypes}
        onChange={({ nodes, connections }) => {
          this.setState({ nodes, connections }); // un-necessary cycle??
        }}
        zoom={this.state.zoom}
      >
      {nodesFromState.map((node, i) => {
        const Component = getComponent(node.config.type);
            return <Component key={i} id={node.id} />;
          })}
      </ReactDAG>
    ];
  }
}
const mapStateToProps = state => {
  return { currentNodeId: state.currentNodeId };
};
export default connect(mapStateToProps)(WorkflowDesigner); 
