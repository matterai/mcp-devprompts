#!/usr/bin/env node

import {
  McpServer,
  ResourceTemplate,
} from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { fetchGist } from './api.js';
import { formatGist } from './format.js';

const server = new McpServer({
  name: 'github-gist-server',
  version: '1.0.0',
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

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);

  console.error('MCP DevPrompts Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
