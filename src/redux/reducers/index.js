import { SHOW_WORKFLOW_NODE_PROPERTIES } from "../actionTypes";


const initialState = {
    currentNodeId: {
        nodeId: 0 }
    }
  
  const rootReducer = (state = initialState, action) => {
      console.log("nodeReducer")
      if(action.type === SHOW_WORKFLOW_NODE_PROPERTIES) {
        state.currentNodeId = action.payload;
      }
      return   state;
  }
  export default rootReducer;