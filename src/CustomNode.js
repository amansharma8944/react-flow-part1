// CustomNode.js
import React from 'react';
import { Handle } from 'react-flow-renderer';

const CustomNode = ({ id, data, selected }) => {
    const handleChange = (event) => {
        data.onChange(id, event.target.value); // Call onChange function passed in node data
      };
    
  return (
    <div style={{ border: '2px solid blue', padding: 10, position: 'relative',borderRadius:"8px", background: selected ? '#cfc8c8' : 'white' }}>
      <Handle type="target" position="top" style={{ borderRadius: 0,width:"14px",height:"14px",position:"absolute",top:"-13px" }} />
      <input value={data.label} onChange={handleChange} style={{ width: '100%' }} />
      <Handle type="source" position="bottom" style={{ borderRadius: 0 ,width:"14px",height:"14px",position:"absolute",bottom:"-13px"}} />
      {selected && (
        <button onClick={() => data.onDelete(id)} style={{ position: 'absolute',width:"25px", right: -10, top: -10, cursor: 'pointer', color: 'white', background: 'red', border: 'none', borderRadius: '50%' }}>
          ×
        </button>
      )}
    </div>
  );
};

export default CustomNode