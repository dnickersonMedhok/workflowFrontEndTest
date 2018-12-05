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

class WorkflowDesigner extends React.Component {

  constructor(props) {
    super(props);
    this.getLayout = this.getLayout.bind(this);
    this.getReactDag = this.getReactDag.bind(this);
    this.setConnections = this.setConnections.bind(this);
  }
  state = {
    zoom: .75,
    workflowModel: null
  };

  setZoom = (zoomIn) => {
    if (zoomIn) {
      this.setState({ zoom: this.state.zoom + 0.2 });
    } else {
      this.setState({ zoom: this.state.zoom - 0.2 });
    }
  };

  setWorkflow() {
    if(this.props.getWorkflowModel()) {
    }
    let wfm = this.props.getWorkflowModel();
    this.setState(() => ({ workflowModel: wfm }));
  }

  getLayout(nodes, connections, separation = 200)  {
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
  
    if(nodes) {
      nodes.forEach(node => {
        const id = node.id;
        graph.setNode(id, { label: node.config ? node.config.label : "", width: 100, height: 100 });
      });
    }
    if(connections) {
    connections.forEach(connection => {
      graph.setEdge(connection.sourceId, connection.targetId);
    });
  }
    dagre.layout(graph);
    return graph;
  };

  componentWillMount() {
    let wfm = this.props.getWorkflowModel();

    if(wfm) {
      let dagModel= JSON.parse(wfm.content);
      const graphNodes = this.getLayout(dagModel.nodes, dagModel.connections);
      let theseNodes = dagModel.nodes.map(node => {
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
      dagModel.nodes = theseNodes;
      this.setState({workflowModel: dagModel});
    }
  }

  getReactDag() {
    let modelFromState = this.state.workflowModel;
    if(modelFromState) {
       return <ReactDAG
          className={`${dagWrapperStyles}`}
          key="dag"
          connections={cloneDeep(modelFromState.connections)}
          nodes={cloneDeep(modelFromState.nodes)}
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
          this.setState({ nodes, connections }); 
        }}
        zoom={this.state.zoom}
        >
        {modelFromState.nodes.map((node, i) => {
        const Component = getComponent(node.config.type);
          return <Component key={i} id={node.id} />;
        })}
        </ReactDAG>
    } else {
      return  <ReactDAG
      className={`${dagWrapperStyles}`}
      key="dag"
      connections={{}}
      nodes={{}}
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
      this.setState({ nodes, connections }); 
    }}
    zoom={this.state.zoom}
    >
    </ReactDAG>
    }
  }

  setConnections(connections) {
    this.props.setConnections(connections);
  }

  render() {
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
        this.getReactDag()
    ];
  }
}
const mapStateToProps = state => {
  return { currentNodeId: state.currentNodeId };
};
export default connect(mapStateToProps)(WorkflowDesigner); 
