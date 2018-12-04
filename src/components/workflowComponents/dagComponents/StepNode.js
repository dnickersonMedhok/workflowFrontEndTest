import * as React from "react";

import {DefaultNode} from "react-dag";
import { getSettings } from '../../../resources/dag-settings'
import { endPointStyles, nodeStyles, nodeWrapperStyles } from "../styles";

import { connect } from "react-redux";
import { showWorkflowNodePropertiesActionHandler } from "../../../redux/actions";



class StepNode extends DefaultNode {
  constructor(props) {
    super(props);
    this.showNodeProps = this.showNodeProps.bind(this);
  }


  rightEndpointRef;

  componentDidMount() {
    const { transformSource } = getSettings();
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...transformSource,
            isSource: true,
            uuid: `${this.props.id}-transform`,
          },
          referenceParams: {},
        },
      ],
      makeTargetParams: {
        allowLoopback: false,
        anchor: "ContinuousLeft",
        dropOptions: { hoverClass: "drag-hover" },
        isTarget: true,
      },
      nodeId: this.props.id,
    };
    if (this.props.initNode) {
      this.props.initNode(initConfig);
    }
  }

  showNodeProps() {
    console.log("called showNodeProps with id: ".concat(this.props.id));
      showWorkflowNodePropertiesActionHandler(this.props.id);
    };
  
  render() {
    const config = this.props.config;
    let style = {};
    if (config) {
      style = config.style;
    }
    return (
      <div onClick={this.showNodeProps}
        id={this.props.id}
        className={`${nodeStyles}`}
        style={style}
      >
        <div className={`${nodeWrapperStyles}`}>
          {config && config.label ? config.label : this.props.id}
          <div
            id={`${this.props.id}-right`}
            ref={ref => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} right`}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  console.log("dispatch");
  return {
    currentNodeId: nodeId => {
       dispatch(showWorkflowNodePropertiesActionHandler(nodeId))
    }
  };
};

//export default NodeType1
export default connect(
  null,
  { mapDispatchToProps }
)(StepNode);
