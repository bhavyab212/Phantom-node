const fs = require('fs');

const src = fs.readFileSync('src/features/desktop-widgets/useAutoLayout.ts', 'utf8');

const blockRegex = /(const\s+HARDCODED_LAYOUTS[^=]*=\s*\{)([\s\S]*?)(\};)/;
const match = src.match(blockRegex);
console.log('Match?', !!match);
if (match) {
  console.log('Group 1:', match[1]);
  console.log('Group 2:', match[2]);
  console.log('Group 3:', match[3]);
  
  let blockContent = match[2];
  
  const id = 'w-system-status';
  const rectStr = '{ x: 10, y: 10, width: 300, height: 380 }';
  const newEntry = `\n  '${id}': ${rectStr},`;

  const entryRegex = new RegExp(`('${id}'|${id})\\s*:\\s*\\{[^}]+\\},?`, 'g');
  console.log('entry regex test:', entryRegex.test(blockContent));
  if (entryRegex.test(blockContent)) {
    blockContent = blockContent.replace(entryRegex, `'${id}': ${rectStr},`);
  } else {
    blockContent = blockContent + newEntry + '\n';
  }
  
  console.log('Result blockContent:\n', blockContent);
  const result = src.replace(blockRegex, `$1${blockContent}$3`);
  console.log('Original src length', src.length, 'New src length', result.length);
  console.log('Src changed?', src !== result);
}
