import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const imagesDir = path.join(process.cwd(), 'Images');
  
  try {
    if (!fs.existsSync(imagesDir)) {
      return NextResponse.json({ lockscreens: [], wallpapers: [] });
    }
    
    const files = fs.readdirSync(imagesDir);
    
    const lockscreens = files.filter(f => {
      const lower = f.toLowerCase();
      return lower.includes('lock_screen') || lower.includes('lockscreen');
    });
    
    const wallpapers = files.filter(f => {
      const lower = f.toLowerCase();
      return lower.includes('wallpaper');
    });
    
    return NextResponse.json({ lockscreens, wallpapers });
  } catch (error) {
    console.error('Error reading Images directory:', error);
    return NextResponse.json({ lockscreens: [], wallpapers: [] }, { status: 500 });
  }
}
