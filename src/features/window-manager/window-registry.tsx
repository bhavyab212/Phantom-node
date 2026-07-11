import { ReactNode } from 'react';
import FilesApp from '../apps/files/FilesApp';
import NotepadApp from '../apps/notepad/NotepadApp';
import SettingsApp from '../apps/settings/SettingsApp';
import PdfViewerApp from '../apps/pdf-viewer/PdfViewerApp';
import JsonViewerApp from '../apps/json-viewer/JsonViewerApp';
import StudioApp from '../apps/studio/StudioApp';
import { WindowInstance } from './useWindowStore';

export interface AppRegistryEntry {
  appId: string;
  title: string;
  defaultWidth: number;
  defaultHeight: number;
  defaultX: number;
  defaultY: number;
  minWidth: number;
  minHeight: number;
  internal?: boolean;
  launchMode?: 'standalone' | 'file-handler';
  storyMode?: boolean;
  render: (window?: WindowInstance) => ReactNode;
}

export const APP_REGISTRY: Record<string, AppRegistryEntry> = {
  'phantom-node-studio': {
    appId: 'phantom-node-studio',
    title: 'Phantom Node Studio',
    defaultWidth: 1100,
    defaultHeight: 750,
    defaultX: 100,
    defaultY: 50,
    minWidth: 800,
    minHeight: 500,
    storyMode: true,
    render: (window) => <StudioApp window={window!} />
  },
  home: { appId: 'phantom-node-studio', title: 'Phantom Node Studio', defaultWidth: 1100, defaultHeight: 750, defaultX: 100, defaultY: 50, minWidth: 800, minHeight: 500, storyMode: true, render: (window) => <StudioApp window={window!} /> },
  work: { appId: 'phantom-node-studio', title: 'Phantom Node Studio', defaultWidth: 1100, defaultHeight: 750, defaultX: 100, defaultY: 50, minWidth: 800, minHeight: 500, storyMode: true, render: (window) => <StudioApp window={window!} /> },
  services: { appId: 'phantom-node-studio', title: 'Phantom Node Studio', defaultWidth: 1100, defaultHeight: 750, defaultX: 100, defaultY: 50, minWidth: 800, minHeight: 500, storyMode: true, render: (window) => <StudioApp window={window!} /> },
  process: { appId: 'phantom-node-studio', title: 'Phantom Node Studio', defaultWidth: 1100, defaultHeight: 750, defaultX: 100, defaultY: 50, minWidth: 800, minHeight: 500, storyMode: true, render: (window) => <StudioApp window={window!} /> },
  contact: { appId: 'phantom-node-studio', title: 'Phantom Node Studio', defaultWidth: 1100, defaultHeight: 750, defaultX: 100, defaultY: 50, minWidth: 800, minHeight: 500, storyMode: true, render: (window) => <StudioApp window={window!} /> },
  about: { appId: 'phantom-node-studio', title: 'Phantom Node Studio', defaultWidth: 1100, defaultHeight: 750, defaultX: 100, defaultY: 50, minWidth: 800, minHeight: 500, storyMode: true, render: (window) => <StudioApp window={window!} /> },
  files: {
    appId: 'files',
    title: 'Files',
    defaultWidth: 800,
    defaultHeight: 500,
    defaultX: 100,
    defaultY: 100,
    minWidth: 400,
    minHeight: 300,
    render: (window) => <FilesApp window={window!} />
  },
  notepad: {
    appId: 'notepad',
    title: 'Notepad',
    defaultWidth: 600,
    defaultHeight: 480,
    defaultX: 150,
    defaultY: 150,
    minWidth: 300,
    minHeight: 200,
    render: (window) => <NotepadApp window={window!} />
  },
  settings: {
    appId: 'settings',
    title: 'Settings',
    defaultWidth: 720,
    defaultHeight: 560,
    defaultX: 200,
    defaultY: 100,
    minWidth: 500,
    minHeight: 400,
    render: () => <SettingsApp />
  },
  'pdf-viewer': {
    appId: 'pdf-viewer',
    title: 'PDF Viewer',
    defaultWidth: 800,
    defaultHeight: 640,
    defaultX: 180,
    defaultY: 120,
    minWidth: 400,
    minHeight: 300,
    internal: true,
    launchMode: 'file-handler',
    render: (window) => <PdfViewerApp window={window!} />
  },
  'json-viewer': {
    appId: 'json-viewer',
    title: 'JSON Viewer',
    defaultWidth: 640,
    defaultHeight: 560,
    defaultX: 220,
    defaultY: 140,
    minWidth: 400,
    minHeight: 300,
    internal: true,
    launchMode: 'file-handler',
    render: (window) => <JsonViewerApp window={window!} />
  },
  terminal: {
    appId: 'terminal',
    title: 'Terminal',
    defaultWidth: 700,
    defaultHeight: 450,
    defaultX: 120,
    defaultY: 180,
    minWidth: 400,
    minHeight: 300,
    render: () => (
      <div className="flex-1 bg-[#121212]/90 backdrop-blur-md h-full w-full p-4 font-mono text-sm text-gray-300 rounded-b-xl">
        <div className="text-[#4ade80] mb-2">agency-webos@system:~$</div>
        <div className="text-gray-400">Terminal interface initialized. Awaiting commands...</div>
        <div className="flex mt-1">
          <span className="text-[#4ade80] mr-2">agency-webos@system:~$</span>
          <span className="w-2 h-4 bg-gray-400 animate-pulse mt-0.5"></span>
        </div>
      </div>
    )
  },
  'recycle-bin': {
    appId: 'recycle-bin',
    title: 'Recycle Bin',
    defaultWidth: 600,
    defaultHeight: 400,
    defaultX: 200,
    defaultY: 200,
    minWidth: 400,
    minHeight: 300,
    render: () => <FilesApp initialFolderId="recycle-bin" />
  }
};
