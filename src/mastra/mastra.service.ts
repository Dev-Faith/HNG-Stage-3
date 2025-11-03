import { Injectable } from '@nestjs/common';
import { telexAgent } from './agents/telex-agent'; // Ensure path is correct

@Injectable()
export class MastraService {
    private readonly agent = telexAgent;
    public readonly agentId = 'code-helper-agent'; // Matches the AGENT_ID in .env

    /**
     * Processes a user message using the Mastra agent.
     * @param message The text message from the Telex user.
     * @returns The agent's text response.
     */
    async processMessage(message: string): Promise<string> {
        console.log(`Processing message: "${message}"`);
        try {
            // FIX: Use the 'input' key, containing the structured messages array.
            const result = await this.agent.generate([
                { role: 'user', content: message }
            ]);
            // FIX 2: Access the text directly from the result object
            return result.text;
        } catch (error) {
            console.error('Mastra Agent Error:', error);
            return 'Sorry, I ran into an internal error while processing your request.';
        }
    }

    /**
     * Helper to get agent metadata for the Agent Card
     */
    getAgentMetadata() {
        // FIX 3: Use the public getter methods (getName() and getDescription())
        return {
            name: this.agent.name,
            description: this.agent.getDescription(),
            tools: Object.keys(this.agent.tools),
        };
    }
}