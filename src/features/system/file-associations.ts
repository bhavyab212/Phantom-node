import { FileItem } from '../apps/files/files-data';

export interface FileAssociation {
  appId: string;
}

export const FILE_ASSOCIATIONS_EXT: Record<string, FileAssociation> = {
  txt: { appId: 'notepad' },
  md: { appId: 'notepad' },
  pdf: { appId: 'pdf-viewer' },
  json: { appId: 'json-viewer' },
};

export const FILE_ASSOCIATIONS_CONTENT_TYPE: Record<string, FileAssociation> = {
  'application/pdf': { appId: 'pdf-viewer' },
  'application/json': { appId: 'json-viewer' },
  'text/plain': { appId: 'notepad' },
  'text/markdown': { appId: 'notepad' },
}

export function getAppForFile(item: FileItem): string | null {
  // 1. Explicit openWith overrides everything
  if (item.openWith) {
    return item.openWith;
  }
  
  // 2. actualContentType
  if (item.actualContentType) {
    const contentTypeMatch = FILE_ASSOCIATIONS_CONTENT_TYPE[item.actualContentType];
    if (contentTypeMatch) {
      return contentTypeMatch.appId;
    }
  }

  // 3. Fallback to extension
  if (item.extension) {
    const normalizedExt = item.extension.toLowerCase();
    const extMatch = FILE_ASSOCIATIONS_EXT[normalizedExt];
    if (extMatch) {
      return extMatch.appId;
    }
  }

  return null;
}
