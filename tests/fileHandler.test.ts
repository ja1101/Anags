/// <reference types="jest" />
import { FileHandler } from '../src/fileHandler';
import * as fs from 'fs';
import * as path from 'path';
import { tmpdir } from 'os';

describe('FileHandler', () => {
  const testDir = path.join(tmpdir(), 'anags-test');
  const testFile = path.join(testDir, 'test.txt');

  beforeEach(() => {
    // Create test directory
    if (!fs.existsSync(testDir)) {
      fs.mkdirSync(testDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test files
    if (fs.existsSync(testDir)) {
      fs.rmSync(testDir, { recursive: true, force: true });
    }
  });

  describe('readWords', () => {
    it('should read words from a file and split by lines', () => {
      const content = 'word1\nword2\nword3\n';
      fs.writeFileSync(testFile, content);

      const words = FileHandler.readWords(testFile);
      expect(words).toEqual(['word1', 'word2', 'word3']);
    });

    it('should filter out empty lines', () => {
      const content = 'word1\n\nword2\n   \nword3\n';
      fs.writeFileSync(testFile, content);

      const words = FileHandler.readWords(testFile);
      expect(words).toEqual(['word1', 'word2', 'word3']);
    });

    it('should throw an error for non-existent files', () => {
      expect(() => {
        FileHandler.readWords('/non/existent/file.txt');
      }).toThrow();
    });
  });

  describe('writeAnagrams', () => {
    it('should write content to a file', () => {
      const content = 'test,content';
      FileHandler.writeAnagrams(testFile, content);

      const writtenContent = fs.readFileSync(testFile, 'utf8');
      expect(writtenContent).toBe(content);
    });

    it('should throw an error when writing to an invalid path', () => {
      expect(() => {
        FileHandler.writeAnagrams('/invalid/path/file.txt', 'content');
      }).toThrow();
    });
  });

  describe('ensureDirectoryExists', () => {
    it('should create directory if it does not exist', () => {
      const deepFilePath = path.join(testDir, 'deep', 'path', 'file.txt');
      expect(fs.existsSync(path.dirname(deepFilePath))).toBe(false);

      FileHandler.ensureDirectoryExists(deepFilePath);
      expect(fs.existsSync(path.dirname(deepFilePath))).toBe(true);
    });
  });
});