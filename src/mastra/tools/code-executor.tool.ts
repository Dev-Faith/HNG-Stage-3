import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const codeExecutorTool = createTool({
  id: 'executeCode',
  description: 'Executes a JavaScript code snippet and returns the output. Use this when asked to run or test code.',
  inputSchema: z.object({
    code: z.string().describe('The JavaScript code to execute, e.g., "2 + 2" or "return 2 + 2;"'),
  }),
  outputSchema: z.object({
    result: z.string().describe('The output from the code execution'),
  }),
  // **Note: In a real app, use a secure sandbox for execution**
  execute: async ({ context }) => {
    try {
      // ⚠️ DANGEROUS: Use only for demonstration.
      let codeToExecute = context.code;

      // 1. Check if the code doesn't explicitly return a value.
      // If it doesn't, wrap it in a function and return the result of the expression.
      if (!codeToExecute.trim().startsWith('return')) {
          // This allows simple expressions like '2 + 2' to return '4' directly.
          codeToExecute = `return (${codeToExecute});`;
      }
      
      // 2. Execute the modified code within a new Function context.
      // This is a cleaner, though still insecure, way to execute code via eval.
      const func = new Function(codeToExecute);
      const result = func();

      // Ensure output is a string for Zod validation
      return { result: String(result) }; 
    } catch (error) {
      return { result: `Error executing code: ${error.message}` };
    }
  },
});