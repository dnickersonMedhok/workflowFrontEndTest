import { SHOW_WORKFLOW_NODE_PROPERTIES } from "./actionTypes";

export const showWorkflowNodePropertiesActionHandler = (thisNodeId) =>  {
  
  console.log("action handler, thisNodeId is ".concat(thisNodeId))
  return ({
  type: SHOW_WORKFLOW_NODE_PROPERTIES ,
  payload: {
    nodeId: thisNodeId }
});
}