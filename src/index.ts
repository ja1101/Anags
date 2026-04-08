import { AnagramGenerator } from './anagramGenerator';
import { FileHandler } from './fileHandler';
import * as path from 'path';

/**
 * Main function to process anagrams
 * @param inputPath Path to input word list file
 * @param outputPath Path to output anagrams file
 */
async function main(inputPath: string = './data/wordlist.txt', outputPath: string = './data/anagrams.txt'): Promise<void> {
  try {
    // Resolve paths relative to the project root
    const resolvedInputPath = path.resolve(inputPath);
    const resolvedOutputPath = path.resolve(outputPath);

    console.log(`Reading words from: ${resolvedInputPath}`);

    // Read words from file
    const words = FileHandler.readWords(resolvedInputPath);
    console.log(`Processing ${words.length} words...`);

    // Generate anagrams
    const anagramResult = AnagramGenerator.generateAnagrams(words);
    console.log(`Found ${anagramResult.groups.length} anagram groups with ${anagramResult.totalCount} words`);

    // Format output
    const formattedAnagrams = AnagramGenerator.formatAnagrams(anagramResult);

    // Ensure output directory exists
    FileHandler.ensureDirectoryExists(resolvedOutputPath);

    // Write results to file
    FileHandler.writeAnagrams(resolvedOutputPath, formattedAnagrams);

    console.log(`Anagrams saved to: ${resolvedOutputPath}`);
  } catch (error) {
    console.error('Error processing anagrams:', error);
    process.exit(1);
  }
}

// Allow input and output paths to be overridden via command line arguments
const args = process.argv.slice(2);
const inputPath = args[0] || './data/wordlist.txt';
const outputPath = args[1] || './data/anags.txt';

main(inputPath, outputPath);