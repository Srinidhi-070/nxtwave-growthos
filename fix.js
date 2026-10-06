const fs = require('fs');
let text = fs.readFileSync('src/app/(student)/quests/page.tsx', 'utf8');
let oldStr = 'left: \${activeNode.x + 3.2}%\, top: \${activeNode.y - 13}%\';
let newStr = 'left: \${activeNode.x}%\, top: \${activeNode.y}%\';
text = text.replace(oldStr, newStr);
fs.writeFileSync('src/app/(student)/quests/page.tsx', text, 'utf8');
