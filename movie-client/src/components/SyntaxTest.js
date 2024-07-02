import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles/hljs';
import "../styles/homepage.style.client.css";
const Component = () => {
    const codeString = `class Solution() {
        public void try() {
                int a = 1;
        }
    }`;
    return <SyntaxHighlighter language='java' style={docco}>{codeString}</SyntaxHighlighter>;
}

export default Component;