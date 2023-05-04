import { basename, dirname } from 'path';


export type PathResult = {
  type: 'file' | 'folder'
  path: string
};

export function getPaths(fullText: string): PathResult[] {
  const lines = fullText.split('\r\n');
  let results: PathResult[] = [];

  lines.forEach((line) => {
    const fileName = basename(line);
    let isFile = false;
    if (fileName.includes('.') && !line.endsWith('/')) {
      isFile = true;
      const dirName = dirname(line);
      if (dirName && dirName !== '.') results.push({ type: 'folder', path: dirName });
    }

    if (line) results.push({ type: isFile ? 'file' : 'folder', path: line });
  });

  return results;
}