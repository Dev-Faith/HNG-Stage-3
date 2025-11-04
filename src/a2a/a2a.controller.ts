import { Controller, Get, Post, Body, Req, Header } from '@nestjs/common';
import type { Request } from 'express';
import { MastraService } from '../mastra/mastra.service';

@Controller() // Use root path for A2A endpoints
export class A2aController {
  constructor(private readonly mastraService: MastraService) { }

  /**
   * 1. Discovery Endpoint: GET /.well-known/agent.json
   * This provides the Agent Card metadata for Telex to discover the agent.
   */
  @Get('.well-known/agent.json')
  @Header('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  getAgentCard(@Req() req: Request) {
    // In a real scenario, you'd use a ConfigService to dynamically get the public URL
    const baseUrl = process.env.AGENT_PUBLIC_URL || `http://${req.headers.host}`;

    const metadata = this.mastraService.getAgentMetadata();

    return {
      active: true,
      category: 'developer-tools',
      name: metadata.name,
      short_description: metadata.description,
      description: metadata.description,
      long_description: metadata.description,
      // The crucial URL points to the communication endpoint
      url: `${baseUrl}/${this.mastraService.agentId}`,
      version: 1,
      nodes: [
        {
          id: 'agent_node',
          name: `${metadata.name} Node`,
          parameters: {},
          // Note on workflow JSON: Use any positive integers for position
          position: [816, -112],
          type: 'a2a/agent-node',
          typeVersion: 1,
          url: `${baseUrl}/${this.mastraService.agentId}`,
        },
      ],
    };
  }

  /**
   * 2. Communication Endpoint: POST /:agentId
   * This receives the JSON-RPC messages from Telex.im.
   */
  @Post('/:agentId') // e.g., POST /code-helper-agent
  async handleA2aRequest(@Body() body: any) {
    // Basic JSON-RPC 2.0 validation
    if (body.jsonrpc !== '2.0' || !body.method || !body.params) {
      return {
        jsonrpc: '2.0',
        error: { code: -32600, message: 'Invalid Request: Must be a valid JSON-RPC 2.0 object.' },
        id: body.id || null,
      };
    }

    const { id, method, params } = body;

    // We only process the 'message/send' method for chat
    if (method === 'message/send' && params.message?.text) {
      const userMessage = params.message.text;

      const agentResponseText = await this.mastraService.processMessage(userMessage);

      // Respond with the required JSON-RPC 2.0 success format
      return {
        jsonrpc: '2.0',
        result: {
          actions: [
            {
              type: 'message/send',
              params: {
                message: {
                  text: agentResponseText,
                  format: 'markdown',
                },
              },
            },
          ],
        },
        id: id,
      };
    }

    // Default response for unhandled methods or invalid input
    return {
      jsonrpc: '2.0',
      error: { code: -32601, message: `Method not found or invalid message format for method: ${method}` },
      id: id || null,
    };
  }
}