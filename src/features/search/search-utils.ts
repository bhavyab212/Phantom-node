import { ContentItem } from '../story/story-data';
import { PaletteCommand } from './commands-data';

export type SearchResultItem = (ContentItem | PaletteCommand) & { score: number };

export function scoreResult(query: string, item: ContentItem | PaletteCommand): number {
  const lowerQuery = query.toLowerCase().trim();
  const lowerLabel = item.label.toLowerCase();
  
  let score = 0;
  
  // 1. Exact match (Highest Priority)
  if (lowerLabel === lowerQuery) {
    score += 100;
  }
  
  // 2. Starts with query
  if (lowerLabel.startsWith(lowerQuery)) {
    score += 50;
  }
  
  // 3. Contains query in label
  if (lowerLabel.includes(lowerQuery)) {
    score += 25;
  }
  
  // 4. Keyword matches
  if (item.keywords.some(k => k.toLowerCase() === lowerQuery)) {
    score += 30; // Exact keyword match
  } else if (item.keywords.some(k => k.toLowerCase().includes(lowerQuery))) {
    score += 15; // Partial keyword match
  }
  
  // Commands get a slight priority boost if they match well
  if (item.type === 'action' && score > 0) {
    score += 10; 
  }

  return score;
}

export function searchAll(
  query: string, 
  contentIndex: ContentItem[], 
  commands: PaletteCommand[]
): SearchResultItem[] {
  if (!query.trim()) return [];
  
  const allItems = [...commands, ...contentIndex];
  const scoredItems = allItems
    .map(item => ({ ...item, score: scoreResult(query, item) }))
    .filter(item => item.score > 0);
    
  // Deduplicate by ID
  const seenIds = new Set<string>();
  const deduplicated = scoredItems.filter(item => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });
  
  // Sort by score descending
  return deduplicated
    .sort((a, b) => b.score - a.score)
    .slice(0, 10); // Limit to top 10 results
}
