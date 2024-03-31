import React from 'react';
import { useState } from 'react';
import { executeCode } from './api';
// Optional: import a spinner component or CSS for a loading indicator

export const Output = ({ editorRef }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const code = editorRef.current.getValue();
    if (!code) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(code);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      // Consider using a more user-friendly notification system
      alert('An error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', width: '50vw' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3 style={{ margin: 0 }}>Output</h3>
        <button
          onClick={runCode}
          style={{ padding: '8px 16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
      </div>
      <div
        style={{
          height: '80vh',
          border: '1px solid #ddd',
          backgroundColor: isError ? '#ffebee' : 'white',
          color: isError ? '#d32f2f' : 'black',
          padding: '10px',
          overflowY: 'auto',
          fontFamily: 'Monaco, "Courier New", monospace',
          fontSize: '14px',
          lineHeight: '1.5',
        }}
      >
        {isLoading ? (
          <div>Loading...</div> // Replace with a spinner or loading indicator if available
        ) : (
          <div id="output">
            {output ? output.map((line, i) => <div key={i}>{line}</div>) : 'Click "Run Code" to see the output here'}
          </div>
        )}
      </div>
    </div>
  );
};
