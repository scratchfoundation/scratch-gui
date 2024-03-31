import React from 'react'
import { Editor } from "@monaco-editor/react";
import { useRef, useState } from "react";
import { Output } from './Output';
import './app.css';

const PythonIDE = () => {
    const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // const onSelect = (language) => {
  //   setLanguage(language);
  //   setValue(CODE_SNIPPETS[language]);
  // };
  const DefaultCodeSnippet=`\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`

  return (
    <div style={{
        display: 'flex',
        borderRadius: '10px',
        margin: '10px',
        overflow: 'hidden', // To ensure the borderRadius affects child components
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Subtle shadow for depth
      }} >

        <Editor
          options={{
            minimap: {
              enabled: false,
            },
          }}
          height="90vh"
          width="calc(50vw - 20px)" // Subtracting margins
          theme="vs-light"
          language="python"
          defaultValue={DefaultCodeSnippet}
          onMount={onMount}
          value={value}
          onChange={(value) => {
            setValue(value);
            console.log(value);
          }}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 'auto', // Adjust based on content
            borderRight: '1px solid #eee', // Separator between editor and output
            padding: '30px' // Padding inside the editor for content
          }}
        />

        <Output
          editorRef={editorRef}
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 'auto', // Adjust based on content
            padding: '10px' // Padding inside the output for content
          }}
        />
    </div>

  )
}

export default PythonIDE
