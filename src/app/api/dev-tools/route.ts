import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const SRC_ROOT = path.join(process.cwd(), 'src');

interface HardcodeRequest {
  target: string; // file key
  patches?: Record<string, string | number>; // constant name → new value
  layoutOverride?: { id: string; rect: any }; // for writing directly into HARDCODED_LAYOUTS
}

// Map of target keys → relative src paths and how to patch them
const TARGET_FILES: Record<string, string> = {
  widgetLayout: 'features/desktop-widgets/useAutoLayout.ts',
  desktopPreferences: 'features/system/useDesktopPreferences.ts',
};

function applyPatches(src: string, patches: Record<string, string | number>): string {
  let result = src;
  for (const [key, value] of Object.entries(patches)) {
    // Match:  const KEY = <number>;
    const numRe = new RegExp(`(const\\s+${key}\\s*=\\s*)([\\d.]+)(;)`, 'g');
    if (numRe.test(result)) {
      result = result.replace(new RegExp(`(const\\s+${key}\\s*=\\s*)([\\d.]+)(;)`, 'g'), `$1${value}$3`);
      continue;
    }
    // Match:  key: <number>,   (object property style)
    const propRe = new RegExp(`(${key}:\\s*)([\\d.]+)(,)`, 'g');
    if (propRe.test(result)) {
      result = result.replace(new RegExp(`(${key}:\\s*)([\\d.]+)(,)`, 'g'), `$1${value}$3`);
      continue;
    }
    // Match:  key: 'string', 
    const strPropRe = new RegExp(`(${key}:\\s*)('[^']*')`, 'g');
    if (strPropRe.test(result)) {
      result = result.replace(new RegExp(`(${key}:\\s*)('[^']*')`, 'g'), `$1'${value}'`);
    }
  }
  return result;
}

function applyLayoutOverride(src: string, override: { id: string; rect: any }): string {
  // Find the HARDCODED_LAYOUTS definition block
  const blockRegex = /(const\s+HARDCODED_LAYOUTS[^=]*=\s*\{)([\s\S]*?)(\};)/;
  const match = src.match(blockRegex);
  if (!match) return src;

  let blockContent = match[2];
  
  // Format the new key-value pair
  const rectStr = `{ x: ${override.rect.x}, y: ${override.rect.y}, width: ${override.rect.width}, height: ${override.rect.height} }`;
  const newEntry = `\n  '${override.id}': ${rectStr},`;

  // Check if it already exists (must not be preceded by // or inside a comment)
  const entryRegex = new RegExp(`(?:^|[\\n\\r])\\s*('${override.id}'|${override.id})\\s*:\\s*\\{[^}]+\\},?`, 'g');
  if (entryRegex.test(blockContent)) {
    blockContent = blockContent.replace(entryRegex, `\n  '${override.id}': ${rectStr},`);
  } else {
    blockContent = blockContent + newEntry + '\n';
  }

  return src.replace(blockRegex, `$1${blockContent}$3`);
}

export async function POST(req: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Dev tools not available in production' }, { status: 403 });
  }

  try {
    const body: HardcodeRequest = await req.json();
    const { target, patches, layoutOverride } = body;

    const relPath = TARGET_FILES[target];
    if (!relPath) {
      return NextResponse.json({ error: `Unknown target: ${target}` }, { status: 400 });
    }

    const filePath = path.join(SRC_ROOT, relPath);
    const original = fs.readFileSync(filePath, 'utf-8');
    
    let patched = original;
    if (patches) {
      patched = applyPatches(patched, patches);
    }
    if (layoutOverride) {
      patched = applyLayoutOverride(patched, layoutOverride);
    }

    if (patched === original) {
      return NextResponse.json({ 
        success: false, 
        message: 'No changes detected – constants may use a different pattern',
        diff: []
      });
    }

    fs.writeFileSync(filePath, patched, 'utf-8');

    // Build a simple diff for the response
    const origLines = original.split('\n');
    const newLines = patched.split('\n');
    const diff: Array<{ line: number; from: string; to: string }> = [];
    for (let i = 0; i < Math.max(origLines.length, newLines.length); i++) {
      if (origLines[i] !== newLines[i]) {
        diff.push({ line: i + 1, from: origLines[i], to: newLines[i] });
      }
    }

    return NextResponse.json({ success: true, file: relPath, diff });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Dev tools not available in production' }, { status: 403 });
  }
  return NextResponse.json({ status: 'dev-tools api ready', targets: Object.keys(TARGET_FILES) });
}
