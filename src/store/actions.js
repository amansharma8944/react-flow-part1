export const CREATE_NODE = 'CREATE_NODE';
export const DELETE_NODE = 'DELETE_NODE';
export const CREATE_EDGE = 'CREATE_EDGE';
export const DELETE_EDGE = 'DELETE_EDGE';

export const createNode = nodeData => ({ type: CREATE_NODE, payload: nodeData });
export const deleteNode = nodeId => ({ type: DELETE_NODE, payload: nodeId });
export const createEdge = edgeData => ({ type: CREATE_EDGE, payload: edgeData });
export const deleteEdge = edgeId => ({ type: DELETE_EDGE, payload: edgeId });
