// BaseNode.js
import React from 'react';
import { Handle, Position } from 'reactflow';
import '../styles/nodes.css';

// BaseNode component that serves as an abstraction for all node types
export const BaseNode = ({
    id,
    data,
    title,
    children,
    inputHandles = [],
    outputHandles = [],
    style = {},
    className = ''
}) => {
    // Default styles that can be overridden
    const defaultStyle = {
        minWidth: '200px',
        minHeight: '80px',
        ...style
    };

    return (
        <div style={defaultStyle} className={`node ${className}`}>
            {/* Node Title */}
            <div className="node-title">
                {title}
            </div>

            {/* Node Content */}
            <div className="node-content">
                {children}
            </div>

            {/* Input Handles */}
            {inputHandles.map((handle, index) => (
                <Handle
                    key={`input-${index}`}
                    type="target"
                    position={Position.Left}
                    id={`${id}-input-${handle.id || index}`}
                    style={{ top: `${(index + 1) * 25}%`, ...handle.style }}
                />
            ))}

            {/* Output Handles */}
            {outputHandles.map((handle, index) => (
                <Handle
                    key={`output-${index}`}
                    type="source"
                    position={Position.Right}
                    id={`${id}-output-${handle.id || index}`}
                    style={{ top: `${(index + 1) * 25}%`, ...handle.style }}
                />
            ))}
        </div>
    );
}; 