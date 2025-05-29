import { useState } from 'react';
import { BaseNode } from './BaseNode';

// 1. Calculator Node - Takes two inputs and performs math operations
export const CalculatorNode = ({ id, data }) => {
    const [operation, setOperation] = useState('+');
    const [result, setResult] = useState(0);

    return (
        <BaseNode
            id={id}
            title="Calculator"
            inputHandles={[
                { id: 'num1', label: 'Number 1' },
                { id: 'num2', label: 'Number 2' }
            ]}
            outputHandles={[{ id: 'result' }]}
            className="calculator-node"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <select
                    value={operation}
                    onChange={(e) => setOperation(e.target.value)}
                >
                    <option value="+">Add</option>
                    <option value="-">Subtract</option>
                    <option value="*">Multiply</option>
                    <option value="/">Divide</option>
                </select>
                <div>Result: {result}</div>
            </div>
        </BaseNode>
    );
};

// 2. Image Node - Displays an image from URL
export const ImageNode = ({ id, data }) => {
    const [imageUrl, setImageUrl] = useState(data?.url || '');

    return (
        <BaseNode
            id={id}
            title="Image Display"
            inputHandles={[{ id: 'url' }]}
            className="image-node"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                    type="text"
                    placeholder="Enter image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                    <img
                        src={imageUrl}
                        alt="Preview"
                        style={{ maxWidth: '100%', height: 'auto' }}
                    />
                )}
            </div>
        </BaseNode>
    );
};

// 3. Timer Node - Creates a countdown timer
export const TimerNode = ({ id }) => {
    const [seconds, setSeconds] = useState(60);
    const [isRunning, setIsRunning] = useState(false);

    return (
        <BaseNode
            id={id}
            title="Timer"
            outputHandles={[{ id: 'timeUp' }]}
            className="timer-node"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                    type="number"
                    value={seconds}
                    onChange={(e) => setSeconds(parseInt(e.target.value))}
                />
                <button onClick={() => setIsRunning(!isRunning)}>
                    {isRunning ? 'Stop' : 'Start'}
                </button>
            </div>
        </BaseNode>
    );
};

// 4. Color Picker Node
export const ColorPickerNode = ({ id }) => {
    const [color, setColor] = useState('#000000');

    return (
        <BaseNode
            id={id}
            title="Color Picker"
            outputHandles={[{ id: 'color' }]}
            className="color-picker-node"
            style={{ background: color }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    style={{ width: '100%' }}
                />
                <div style={{ color: color === '#ffffff' ? '#000000' : '#ffffff' }}>
                    {color}
                </div>
            </div>
        </BaseNode>
    );
};

// 5. List Node - Manages a list of items
export const ListNode = ({ id }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (newItem.trim()) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    return (
        <BaseNode
            id={id}
            title="List Manager"
            outputHandles={[{ id: 'list' }]}
            className="list-node"
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Add item"
                        style={{ flex: 1 }}
                    />
                    <button onClick={addItem}>Add</button>
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                    {items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </BaseNode>
    );
}; 