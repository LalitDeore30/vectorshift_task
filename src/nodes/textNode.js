// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Function to detect variables in the text (format: "{{variableName}}")
  const detectVariables = (text) => {
    const regex = /\{\{([^}]+)\}\}/g;
    const matches = [...text.matchAll(regex)];
    return matches.map(match => match[1]);
  };

  // Function to adjust textarea height
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Handle text changes
  const handleTextChange = (e) => {
    const newText = e.target.value;
    setCurrText(newText);

    // Detect variables
    const newVariables = detectVariables(newText);
    setVariables(newVariables);

    // Adjust height
    adjustTextareaHeight();

    // Call parent onChange if provided
    if (data.onChange) {
      data.onChange({ ...data, currText: newText });
    }
  };

  // Initial height adjustment
  useEffect(() => {
    adjustTextareaHeight();
  }, []);

  return (
    <div style={{ border: '1px solid black', padding: '10px', borderRadius: '5px' }}>
      <Handle
        type="target"
        position={Position.Left}
        id={`${id}-input`}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{ background: '#555' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div>Text Node</div>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          placeholder="Enter text here..."
          style={{
            resize: 'none',
            minHeight: '60px',
            overflow: 'hidden'
          }}
        />
        {variables.length > 0 && (
          <div style={{ fontSize: '12px', color: '#666' }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
