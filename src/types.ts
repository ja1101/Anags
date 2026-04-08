export interface AnagramGroup {
  key: string;
  words: string[];
}

export interface AnagramResult {
  groups: AnagramGroup[];
  totalCount: number;
}