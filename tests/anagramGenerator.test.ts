/// <reference types="jest" />
import { AnagramGenerator } from '../src/anagramGenerator';

describe('AnagramGenerator', () => {
  describe('generateAnagrams', () => {
    it('should group anagrams correctly', () => {
      const words = ['listen', 'silent', 'enlist', 'cat', 'act', 'tac', 'dog'];
      const result = AnagramGenerator.generateAnagrams(words);

      // Should have 2 groups: one for listen/silent/enlist, one for cat/act/tac
      expect(result.groups.length).toBe(2);

      // Find the listen group and cat group
      const listenGroup = result.groups.find(g => g.words.includes('listen'));
      const catGroup = result.groups.find(g => g.words.includes('cat'));

      expect(listenGroup).toBeDefined();
      expect(catGroup).toBeDefined();

      if (listenGroup) {
        expect(listenGroup.words).toContain('listen');
        expect(listenGroup.words).toContain('silent');
        expect(listenGroup.words).toContain('enlist');
      }

      if (catGroup) {
        expect(catGroup.words).toContain('cat');
        expect(catGroup.words).toContain('act');
        expect(catGroup.words).toContain('tac');
      }
    });

    it('should handle empty input', () => {
      const words: string[] = [];
      const result = AnagramGenerator.generateAnagrams(words);

      expect(result.groups.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it('should handle words with no anagrams', () => {
      const words = ['cat', 'dog', 'bird'];
      const result = AnagramGenerator.generateAnagrams(words);

      expect(result.groups.length).toBe(0);
      expect(result.totalCount).toBe(0);
    });

    it('should handle case sensitivity correctly', () => {
      const words = ['Listen', 'Silent', 'Enlist'];
      const result = AnagramGenerator.generateAnagrams(words);

      expect(result.groups.length).toBe(1);
      expect(result.groups[0].words).toContain('Listen');
      expect(result.groups[0].words).toContain('Silent');
      expect(result.groups[0].words).toContain('Enlist');
    });
  });

  describe('formatAnagrams', () => {
    it('should format anagram groups correctly', () => {
      const result = {
        groups: [
          { key: 'eilnst', words: ['listen', 'silent', 'enlist'] },
          { key: 'act', words: ['cat', 'act', 'tac'] }
        ],
        totalCount: 6
      };

      const formatted = AnagramGenerator.formatAnagrams(result);
      const lines = formatted.split('\n');

      expect(lines.length).toBe(2);
      expect(lines).toContain('listen, silent, enlist');
      expect(lines).toContain('cat, act, tac');
    });
  });
});