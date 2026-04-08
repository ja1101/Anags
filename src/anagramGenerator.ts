import { AnagramGroup, AnagramResult } from './types';

export class AnagramGenerator {
  /**
   * Generates groups of anagrams from an array of words
   * @param words Array of words to process
   * @returns Object containing anagram groups and total count
   */
  static generateAnagrams(words: string[]): AnagramResult {
    const groups: { [key: string]: string[] } = {};

    for (const word of words) {
      // Normalize the word for comparison
      const normalized = word.toLowerCase().trim();
      if (normalized.length === 0) continue;

      // Create a sorted key for anagram grouping
      const sortedKey = normalized.split('').sort().join('');

      if (!groups[sortedKey]) {
        groups[sortedKey] = [];
      }

      // Only add unique words to prevent duplicates
      if (!groups[sortedKey].includes(word)) {
        groups[sortedKey].push(word);
      }
    }

    // Filter out groups with only one word (not anagrams!) and format the result
    const anagramGroups: AnagramGroup[] = Object.entries(groups)
      .filter(([_, words]) => words.length > 1)
      .map(([key, words]) => ({ key, words }));

    return {
      groups: anagramGroups,
      totalCount: anagramGroups.reduce((count, group) => count + group.words.length, 0)
    };
  }

  /**
   * Formats anagram groups for output
   * @param result AnagramResult object
   * @returns Formatted string representation
   */
  static formatAnagrams(result: AnagramResult): string {
    return result.groups
      .map(group => group.words.join(', '))
      .join('\n');
  }
}