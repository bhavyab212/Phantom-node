const blockContent = `
  // e.g. 'w-system-status': { x: 620.75, y: 36, width: 300, height: 380 },
  'w-system-status': { x: 10, y: 10, width: 300, height: 380 },
`;
const id = 'w-system-status';
const entryRegex = new RegExp(`(?:^|[\\n\\r])\\s*('${id}'|${id})\\s*:\\s*\\{[^}]+\\},?`, 'g');
let match = entryRegex.exec(blockContent);
console.log('Match result:', match ? match[0] : 'no match');

// Test replacing
const rectStr = '{ x: 99, y: 99, width: 1, height: 1 }';
console.log('Replaced:', blockContent.replace(entryRegex, `\n  '${id}': ${rectStr},`));

