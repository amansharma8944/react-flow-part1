// Home.js
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, MiniMap, Controls, useNodesState, useEdgesState, Background } from 'react-flow-renderer';

import CustomNode from './CustomNode'; // Adjust the import path as needed

const initialNodes = []; // Start with an empty array or initial nodes
const nodeTypes = { customNode: CustomNode };

const Home = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);


  const [selectedElement, setSelectedElement] = useState(null); // Store selected node or edge
  const deleteBtnRef = useRef();
  // const [nodes, setNodes] = useState(initialNodes);
  // const [edges, setEdges] = useState([]);

  const onChangeNodeContent = useCallback((nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) => node.id === nodeId ? { ...node, data: { ...node.data, label: newLabel, onChange: onChangeNodeContent, onDelete: onDeleteNode } } : node)
    );
  }, [setNodes]);


  

  
  const onDeleteNode = useCallback((nodeId) => {
    setNodes((prevNodes) => prevNodes.filter((n) => n.id !== nodeId));
    setEdges((prevEdges) => prevEdges.filter((e) => e.source !== nodeId && e.target !== nodeId));
  }, []);
  const addNode = useCallback(() => {
    const newNode = {
      id: `node_${Math.random().toString(36).substr(2, 9)}`,
      type: 'customNode',
      position: { x: Math.random() * window.innerWidth * 0.5, y: Math.random() * window.innerHeight * 0.5 },
      data: { label: `Node ${Math.random().toString(36).substr(2, 9)}`, onChange: onChangeNodeContent, onDelete: onDeleteNode },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [onChangeNodeContent, onDeleteNode]);

  const onConnect = useCallback((params) => {
    const newEdge = { id: `e${params.source}-${params.target}`, ...params };
    setEdges((eds) => addEdge(newEdge, eds));
  }, []);

  const onNodeDragStop = (event, node) => {
    setNodes((nds) => nds.map((n) => (n.id === node.id ? node : n)));
  };



  const onSelectionChange = useCallback((elements) => {
    if (!Array.isArray(elements)) {
      console.error('Expected elements to be an array, received:', elements);
      return;
    }
    
    const selectedEdge = elements.find(el => el.id.startsWith('e'));
    if (selectedEdge) {
      setSelectedElement(selectedEdge);
    } else {
      setSelectedElement(null); // Deselect if no edge is selected
    }
  }, []);
  
  // const onSelectionChange = useCallback((elements) => {


    
  //   const selectedEdge = elements?.find(el => el.id.startsWith('e'));
  //   if (selectedEdge) {
  //     setSelectedElement(selectedEdge);
  //   } else {
  //     setSelectedElement(null); // Deselect if no edge is selected
  //   }
  // }, []);

  const onDeleteSelected = useCallback(() => {
    if (!selectedElement) return;
  
    if (selectedElement.id.startsWith('e')) { // Confirm it's an edge
      setEdges(eds => eds.filter(e => e.id !== selectedElement.id));
    }
  
    setSelectedElement(null); // Clear selection after deletion
  }, [selectedElement, setEdges]);
  

  // Position the delete button near the selected element
  useEffect(() => {
    setNodes((currentNodes) =>
      currentNodes.map((node) => ({
        ...node,
        data: { ...node.data, onChange: onChangeNodeContent },
      }))
    );
  }, [onChangeNodeContent]);
  

  return (
    <div style={{ height: '100vh', position: 'relative' }}>

      <button onClick={addNode}  
      

      style={{color: "white",
      background: "#4a86e8",
      position: "absolute",
      zIndex: 5,
      padding: "10px 17px",
      borderRadius: "9px",
      top: "7vh",
      left: "6vw"}}

      
      >Add Node</button>
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onSelectionChange={onSelectionChange}
          nodeTypes={nodeTypes}
          fitView
          
        >
          <MiniMap />
          <Controls />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
      </ReactFlowProvider>
      {selectedElement && (
        <button
          ref={deleteBtnRef}
          onClick={onDeleteSelected}
          style={{ position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 1000 }}
        >
          X
        </button>
      )}
    </div>

  );
};

export default Home;
