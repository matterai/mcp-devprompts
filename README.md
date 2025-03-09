# MCP DevPrompts

A Model Context Protocol (MCP) server for accessing GitHub Gists containing developer prompts and templates. This server enables Claude and other AI assistants to retrieve markdown-based prompt templates from GitHub Gists.

## Features

- Access GitHub Gists as MCP resources using the URI format `gist://github/{gistId}`
- Provides a `read-gist` tool for programmatic access to gist content
- Extracts and formats markdown content from gists
- Supports authenticated GitHub API access to avoid rate limiting
- Provides proper error handling for failed requests

## Installation

### Quick start with npx

You can run the server directly without installation:

```bash
npx -y @matterai/mcp-devprompts
```

With GitHub token for authentication:

```bash
GITHUB_TOKEN=your_token npx -y @matterai/mcp-devprompts
```

### Local installation

```bash
# Install globally
npm install -g @matterai/mcp-devprompts

# Run the server
mcp-devprompts
```

### From source

```bash
# Clone this repository
git clone https://github.com/matterai/mcp-devprompts.git
cd mcp-devprompts

# Install dependencies
npm install

# Build the project
npm run build

# Run the server
npm start
```

### Using with Claude for Desktop

1. Configure Claude for Desktop to use this server by editing your configuration file:

```json
{
  "mcpServers": {
    "github-gist-server": {
      "command": "npx",
      "args": ["-y", "@matterai/mcp-devprompts"]
    }
  }
}
```

2. For authenticated GitHub access (recommended to avoid API rate limits):

```json
{
  "mcpServers": {
    "github-gist-server": {
      "command": "npx",
      "args": ["-y", "@matterai/mcp-devprompts"],
      "env": {
        "GITHUB_TOKEN": "your-github-personal-access-token"
      }
    }
  }
}
```

3. If you installed the package globally:

```json
{
  "mcpServers": {
    "github-gist-server": {
      "command": "mcp-devprompts"
    }
  }
}
```

### Using with MCP Inspector

For testing and debugging, you can use the MCP Inspector:

```bash
# Using npx
npx @modelcontextprotocol/inspector npx -y @matterai/mcp-devprompts

# If installed globally
npx @modelcontextprotocol/inspector mcp-devprompts

# If running from source
npx @modelcontextprotocol/inspector node dist/index.js
```

## Accessing Gists

### Using Resource URIs

When connected to an MCP client like Claude, you can access gists using:

```
gist://github/c6d403bf2226db31a68948e26255a172
```

Replace the ID with the actual GitHub Gist ID from the URL.

### Using the read-gist Tool

The server also provides a `read-gist` tool that you can use to fetch gist content programmatically:

```
Tool: read-gist
Parameters:
  - gist_id: The GitHub Gist ID (e.g., "c6d403bf2226db31a68948e26255a172")
```

Example usage with Claude:
"Please fetch the gist with ID c6d403bf2226db31a68948e26255a172"

Claude will use the tool to retrieve and display the gist content.

## GitHub Authentication

To avoid rate limits, it's recommended to use a GitHub personal access token:

1. Go to GitHub Settings > Developer settings > Personal access tokens > Generate new token
2. Create a token with the "gist" scope (read-only access is sufficient)
3. Set the token as an environment variable or in your Claude Desktop configuration

## License

MIT
