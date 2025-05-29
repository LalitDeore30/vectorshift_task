// submit.js
import { useState } from 'react';
import { useReactFlow } from 'reactflow';

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const reactFlowInstance = useReactFlow();

    if (!reactFlowInstance) {
        console.error('React Flow context not available');
        return null;
    }

    const processText = (nodes, edges) => {
        // Find input, text, and output nodes
        const inputNode = nodes.find(n => n.type === 'customInput');
        const textNode = nodes.find(n => n.type === 'text');
        const outputNode = nodes.find(n => n.type === 'customOutput');

        console.log('Input Node:', inputNode);
        console.log('Text Node:', textNode);
        console.log('Output Node:', outputNode);

        if (!inputNode || !textNode || !outputNode) {
            console.log('Missing some nodes');
            return null;
        }

        // Get input value from the input field
        const inputValue = inputNode.data?.currName || inputNode.data?.inputName || '';
        console.log('Input Value:', inputValue);

        // Get text template and replace variables
        const textTemplate = textNode.data?.currText || textNode.data?.text || '';
        console.log('Text Template:', textTemplate);

        const processedText = textTemplate.replace(/\{\{input\}\}/g, inputValue);
        console.log('Processed Text:', processedText);

        return processedText;
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Get the current nodes and edges from the flow
            const nodes = reactFlowInstance.getNodes();
            const edges = reactFlowInstance.getEdges();

            console.log('Nodes:', nodes);
            console.log('Edges:', edges);

            // Process the text
            const processedText = processText(nodes, edges);
            console.log('Final Processed Text:', processedText);

            // Send data to backend
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit pipeline');
            }

            const data = await response.json();

            // Show alert with results including processed text
            const message = `Pipeline Analysis:
- Number of Nodes: ${data.num_nodes}
- Number of Edges: ${data.num_edges}
- Is DAG: ${data.is_dag ? 'Yes' : 'No'}
${processedText ? '\nProcessed Text: ' + processedText : ''}`;

            alert(message);

        } catch (err) {
            setError(err.message);
            alert(`Error: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            padding: '10px'
        }}>
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                style={{
                    padding: '8px 16px',
                    fontSize: '14px',
                    backgroundColor: isLoading ? '#ccc' : '#6c5ce7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                }}
            >
                {isLoading ? 'Submitting...' : 'Submit Pipeline'}
            </button>
            {error && (
                <div style={{ color: 'red', fontSize: '12px' }}>
                    {error}
                </div>
            )}
        </div>
    );
};
