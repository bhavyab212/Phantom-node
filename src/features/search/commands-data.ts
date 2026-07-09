import { useWindowStore } from '../window-manager/useWindowStore';
import { useDesktopPreferences } from '../system/useDesktopPreferences';

export interface PaletteCommand {
  id: string;
  type: 'action';
  label: string;
  keywords: string[];
  icon: string;
  action: () => void;
}

export const PALETTE_COMMANDS: PaletteCommand[] = [
  {
    id: 'cmd-open-contact',
    label: 'Start a project',
    type: 'action',
    keywords: ['contact', 'hire', 'quote', 'project', 'start'],
    icon: 'mail',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['contact'];
      if (entry) openApp('contact', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-open-home',
    label: 'Go to Studio',
    type: 'action',
    keywords: ['home', 'studio', 'start', 'welcome'],
    icon: 'home',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['home'];
      if (entry) openApp('home', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-open-work',
    label: 'Browse work',
    type: 'action',
    keywords: ['work', 'portfolio', 'case study', 'projects'],
    icon: 'briefcase',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['work'];
      if (entry) openApp('work', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-open-services',
    label: 'View services',
    type: 'action',
    keywords: ['services', 'pricing', 'offerings'],
    icon: 'grid',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['services'];
      if (entry) openApp('services', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-open-process',
    label: 'See our process',
    type: 'action',
    keywords: ['process', 'how we work', 'methodology', 'timeline'],
    icon: 'workflow', // We'll map this to Map icon in the result item
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['process'];
      if (entry) openApp('process', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-open-files',
    label: 'Open Files',
    type: 'action',
    keywords: ['files', 'documents', 'portfolio', 'archive'],
    icon: 'folder',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['files'];
      if (entry) openApp('files', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-open-settings',
    label: 'Open Settings',
    type: 'action',
    keywords: ['settings', 'preferences', 'wallpaper', 'theme'],
    icon: 'settings',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['settings'];
      if (entry) openApp('settings', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  },
  {
    id: 'cmd-toggle-theme',
    label: 'Toggle dark/light mode',
    type: 'action',
    keywords: ['dark', 'light', 'theme', 'mode', 'toggle'],
    icon: 'moon',
    action: () => {
      const { toggleTheme } = useDesktopPreferences.getState();
      toggleTheme();
    }
  },
  {
    id: 'cmd-open-about',
    label: 'About this studio',
    type: 'action',
    keywords: ['about', 'team', 'studio', 'info'],
    icon: 'info',
    action: () => {
      const { openApp } = useWindowStore.getState();
      const APP_REGISTRY = require('../window-manager/window-registry').APP_REGISTRY;
      const entry = APP_REGISTRY['about'];
      if (entry) openApp('about', entry.title, { width: entry.defaultWidth, height: entry.defaultHeight, x: entry.defaultX, y: entry.defaultY });
    }
  }
];
