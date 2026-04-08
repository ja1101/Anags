import * as fs from 'fs';
import * as path from 'path';

export class FileHandler {
  static readWords(filePath: string): string[] {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      return data.split(/\r?\n/).filter((word: string) => word.trim().length > 0);
    } catch (error) {
      throw new Error(`Failed to read file ${filePath}: ${error}`);
    }
  }

  static writeAnagrams(outputPath: string, content: string): void {
    try {
      fs.writeFileSync(outputPath, content);
    } catch (error) {
      throw new Error(`Failed to write file ${outputPath}: ${error}`);
    }
  }

  static ensureDirectoryExists(filePath: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
}