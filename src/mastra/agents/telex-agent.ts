import { Agent } from '@mastra/core/agent';
import { openai } from '@ai-sdk/openai';
import { codeExecutorTool } from '../tools/code-executor.tool';
import { Memory } from '@mastra/memory';
import { groq } from '@ai-sdk/groq';

// The agent's conversation memory
const agentMemory = new Memory();

export const telexAgent = new Agent({
  name: 'CodeHelper',
  description: 'An expert JavaScript/TypeScript Code Helper that assists developers on Telex. It can execute code snippets when necessary.',
  instructions: `
    You are an expert developer assistant named **CodeHelper**.
    Your goal is to provide concise, correct, and helpful responses to coding queries.
    - If the user asks you to run or test code, you **MUST** use the 'executeCode' tool.
    - Keep your responses professional and focused on the technical problem.
    - You maintain conversation context via memory.
  `,
  model: groq('llama-3.1-8b-instant'), // Efficient model for chat
  memory: agentMemory,
  tools: {
    executeCode: codeExecutorTool,
  },
});