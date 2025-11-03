// src/mastra/agents/telex-agent.ts

import { groq } from '@ai-sdk/groq';
// 1. Import Agent and Memory
import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory'; 

// 2. Import your local tool
import { codeExecutorTool } from '../../mastra/tools/code-executor.tool'; 

// 3. Define and initialize agentMemory
const agentMemory = new Memory(); // <--- This line defines the missing variable

export const telexAgent = new Agent({
  name: 'CodeHelper',
  description: 'An expert JavaScript/TypeScript Code Helper...', // Ensure this is present
  instructions: `
    You are an expert developer assistant named CodeHelper. 
    Your goal is to provide concise, correct, and helpful responses to coding queries.
    Use the 'executeCode' tool when asked to run code.
  `, 
  
  model: groq('llama3-8b-8192'),
  
  memory: agentMemory, // Now defined
  tools: {
    executeCode: codeExecutorTool, // Now imported
  },
});