export function formatGist(gist: any): string {
  try {
    let formattedContent: string = '';

    for (const [filename, fileData] of Object.entries(gist.files)) {
      const file = fileData as any;

      if (file.language === 'Markdown' || file.type === 'text/markdown') {
        formattedContent += `\n## ${filename}\n\n`;
        formattedContent += `${(fileData as any).content}\n`;
      }
    }

    return formattedContent;
  } catch (error) {
    console.error('Error formatting gist content:', error);
    return 'Error formatting gist content';
  }
}
