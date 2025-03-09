#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { fetchGist } from './api.js';
import { formatGist } from './format.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'github-gist-server',
  version: '1.0.1',
});

server.resource(
  'gist',
  new ResourceTemplate('gist://github/{gistId}', { list: undefined }),
  {
    description: 'GitHub Gist',
    mimeType: 'application/json',
  },
  async (uri, { gistId }) => {
    try {
      const gist = await fetchGist(`${gistId}`);
      const content = formatGist(gist);

      return {
        contents: [
          {
            uri: uri.href,
            text: content,
            mimeType: 'text/markdown',
          },
        ],
      };
    } catch (error) {
      console.error(`Error processing gist resource ${gistId}:`, error);
      return {
        contents: [
          {
            uri: uri.href,
            text: `Error retrieving gist: ${(error as Error).message}`,
            mimeType: 'text/plain',
          },
        ],
      };
    }
  }
);

// Add read-gist tool
server.tool(
  'read-gist',
  'Fetch and read the content of a GitHub Gist',
  {
    gist_id: z
      .string()
      .describe('The GitHub Gist ID (e.g. c6d403bf2226db31a68948e26255a172)'),
  },
  async (args) => {
    try {
      const gist = await fetchGist(args.gist_id);
      const content = formatGist(gist);

      return {
        content: [
          {
            type: 'text',
            text: content || 'No content found in this gist.',
          },
        ],
      };
    } catch (error) {
      console.error(`Error processing gist ${args.gist_id}:`, error);

      return {
        content: [
          {
            type: 'text',
            text: `Failed to retrieve gist: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP DevPrompts Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
