const blockContent = `
  // e.g. 'w-system-status': { x: 620.75, y: 36, width: 300, height: 380 },
`;
const id = 'w-system-status';
const entryRegex = new RegExp(`(?:^|[\\n\\r])\\s*('${id}'|${id})\\s*:\\s*\\{[^}]+\\},?`, 'g');
console.log('regex test:', entryRegex.test(blockContent));
