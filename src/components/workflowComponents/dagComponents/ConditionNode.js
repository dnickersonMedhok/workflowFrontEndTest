import * as React from "react";

import { endPointStyles, nodeStyles, nodeWrapperStyles } from "../styles";

import {DefaultNode} from "react-dag";
import { css } from "glamor";
import { getSettings } from '../../../resources/dag-settings'
import { connect } from "react-redux";
import { showWorkflowNodePropertiesActionHandler } from "../../../redux/actions";


const modEndPointStyles = css({
  "&.bottom": {
    height: "15px",
    left: "100px",
    top: "90px",
  },
  "&.right": {
    height: "10px",
    left: "190px",
    top: "35px",
  },
});

class ConditionNode extends DefaultNode {

  constructor(props) {
    super(props);
    this.showNodeProps = this.showNodeProps.bind(this);
  }
  rightEndpointRef;
  bottomEndpointRef;

  componentDidMount() {
    const {
      conditionBottomEndpoint,
      conditionRightEndpoint,
    } = getSettings();
    const initConfig = {
      endPointParams: [
        {
          element: this.rightEndpointRef,
          params: {
            ...conditionRightEndpoint,
            isSource: true,
            uuid: `${this.props.id}-condition-right`,
          },
          referenceParams: {},
        },
        {
          element: this.bottomEndpointRef,
          params: {
            ...conditionBottomEndpoint,
            uuid: `${this.props.id}-condition-bottom`,
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
      <div
      onClick={this.showNodeProps}
        id={this.props.id}
        className={`${nodeStyles}`}
        style={style}
      >
        <div className={`${nodeWrapperStyles}`}>
          {config && config.label ? config.label : this.props.id}
          <div
            id={`${this.props.id}-right`}
            ref={ref => (this.rightEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} right`}
          />
          <div
            id={`${this.props.id}-bottom`}
            ref={ref => (this.bottomEndpointRef = ref)}
            className={`${endPointStyles} ${modEndPointStyles} bottom`}
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

export default connect(
  null,
  { mapDispatchToProps }
)(ConditionNode);