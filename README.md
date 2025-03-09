# MCP DevPrompts

A Model Context Protocol (MCP) server for accessing GitHub Gists containing developer prompts and templates. This server enables Claude and other AI assistants to retrieve markdown-based prompt templates from GitHub Gists.

## Features

- Access GitHub Gists as MCP resources using the URI format `gist://github/{gistId}`
- Extracts and formats markdown content from gists
- Supports authenticated GitHub API access to avoid rate limiting
- Provides proper error handling for failed requests

## Installation

```bash
# Clone this repository
git clone https://github.com/matterai/mcp-devprompts.git
cd mcp-devprompts

# Install dependencies
npm install

# Build the project
npm run build
```

## Usage

### Running the server

```bash
npm start
```

### Using with Claude for Desktop

1. Configure Claude for Desktop to use this server by editing your configuration file:

```json
{
  "mcpServers": {
    "github-gist-server": {
      "command": "node",
      "args": ["/path/to/mcp-devprompts/build/index.js"]
    }
  }
}
```

2. For authenticated GitHub access (recommended to avoid API rate limits):

```json
{
  "mcpServers": {
    "github-gist-server": {
      "command": "node",
      "args": ["/path/to/mcp-devprompts/build/index.js"],
      "env": {
        "GITHUB_TOKEN": "your-github-personal-access-token"
      }
    }
  }
}
```

### Using with MCP Inspector

For testing and debugging, you can use the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node build/index.js
```

## Accessing Gists

When connected to an MCP client like Claude, you can access gists using:

```
gist://github/c6d403bf2226db31a68948e26255a172
```

Replace the ID with the actual GitHub Gist ID from the URL.

## GitHub Authentication

To avoid rate limits, it's recommended to use a GitHub personal access token:

1. Go to GitHub Settings > Developer settings > Personal access tokens > Generate new token
2. Create a token with the "gist" scope (read-only access is sufficient)
3. Set the token as an environment variable or in your Claude Desktop configuration

## License

MIT
