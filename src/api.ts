import fetch from 'node-fetch';

const GITHUB_API_URL = 'https://api.github.com';

export async function fetchGist(gistId: string): Promise<any> {
  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.raw+json',
      'User-Agent': 'MCP-DevPrompts-Server/1.0',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`${GITHUB_API_URL}/gists/${gistId}`, {
      headers,
    });

    if (!response.ok)
      throw new Error(
        `GitHub API Error: ${response.status} ${response.statusText}`
      );

    return await response.json();
  } catch (error) {
    console.error(`Error fetching gist ${gistId}:`, error);
    throw error;
  }
}
