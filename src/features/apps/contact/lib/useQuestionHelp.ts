import { useState, useEffect, useMemo } from 'react';

export interface QuestionHelpRecord {
  questionId: string;
  sourceId: string;
  sourceTitle: string;
  questionText: string;
  hoverTitle: string;
  about: string;
  detail: string;
  whatGoodAnswerLooksLike: string;
  exampleAnswer: string;
  uiHint: string;
  privacyNote: string;
}

  // Memory cache so we only parse it once if multiple components need it
let cachedHelpMap: Map<string, QuestionHelpRecord> | null = null;
let isLoading = false;
let loadPromise: Promise<void> | null = null;

export function useQuestionHelp(dimension: string | null) {
  const [helpMap, setHelpMap] = useState<Map<string, QuestionHelpRecord> | null>(cachedHelpMap);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    if (cachedHelpMap || isLoading) {
      if (loadPromise) {
        loadPromise.then(() => setHelpMap(cachedHelpMap));
      }
      return;
    }

    isLoading = true;
    
    // We import dynamically so we don't block main thread parsing massive JSON upfront 
    // if the user never uses it.
    loadPromise = import('../data/phantom-node-dimension-help.json')
      .then((module) => {
        const data = module.default || module;
        const map = new Map<string, QuestionHelpRecord>();
        if (data.records && Array.isArray(data.records)) {
          data.records.forEach((record: any) => {
            map.set(record.dimension, record);
          });
        }
        cachedHelpMap = map;
        setHelpMap(map);
      })
      .catch((err) => {
        console.warn('Failed to load contextual question help:', err);
        setError(true);
      })
      .finally(() => {
        isLoading = false;
      });
  }, []);

  const record = useMemo(() => {
    if (!dimension || !helpMap) return null;
    return helpMap.get(dimension) || null;
  }, [dimension, helpMap]);

  return {
    record,
    loading: !helpMap && !error,
    error
  };
}
