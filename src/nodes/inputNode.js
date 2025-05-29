// inputNode.js

import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data.inputType || 'Text');

  const handleNameChange = (e) => {
    const newValue = e.target.value;
    setCurrName(newValue);
    // Update the node data
    if (data.onChange) {
      data.onChange({ ...data, currName: newValue });
    }
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setInputType(newType);
    if (data.onChange) {
      data.onChange({ ...data, inputType: newType });
    }
  };

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>Input</span>
      </div>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
          />
        </label>
        <label>
          Type:
          <select value={inputType} onChange={handleTypeChange}>
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </label>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-value`}
      />
    </div>
  );
}
