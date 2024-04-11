import { CREATE_NODE, DELETE_NODE, CREATE_EDGE, DELETE_EDGE } from './actions';

const initialState = {
  nodes: [],
  edges: [],
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NODE:
      return { ...state, nodes: [...state.nodes, action.payload] };
    case DELETE_NODE:
      return {
        ...state,
        nodes: state.nodes.filter(node => node.id !== action.payload),
        edges: state.edges.filter(edge => edge.source !== action.payload && edge.target !== action.payload),
      };
    case CREATE_EDGE:
      return { ...state, edges: [...state.edges, action.payload] };
    case DELETE_EDGE:
      return { ...state, edges: state.edges.filter(edge => edge.id !== action.payload) };
    default:
      return state;
  }
};

export default graphReducer;
