import { createTool } from '@mastra/core/tools';
import { z } from 'zod';

export const codeExecutorTool = createTool({
  id: 'executeCode',
  description: 'Executes a JavaScript code snippet and returns the output. Use this when asked to run or test code.',
  inputSchema: z.object({
    code: z.string().describe('The JavaScript code to execute, e.g., "console.log(2 + 2)"'),
  }),
  outputSchema: z.object({
    result: z.string().describe('The output from the code execution'),
  }),
  // **Note: In a real app, you would use a secure sandbox like Freestyle for execution**
  execute: async ({ context }) => {
    try {
      // Mock execution for simplicity. In production, use a secure execution environment.
      const result = eval(context.code); // DANGEROUS, DO NOT USE IN PRODUCTION
      return { result: String(result) };
    } catch (error) {
      return { result: `Error executing code: ${error.message}` };
    }
  },
});